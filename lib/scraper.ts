import * as cheerio from "cheerio";
import { ScrapedPage, ScrapedProduct, ScrapedTechnicalSignals } from "@/types/audit";

const FETCH_TIMEOUT_MS = 12000;

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export class ScraperError extends Error {
  code: string;
  statusCode?: number;

  constructor(message: string, code: string, statusCode?: number) {
    super(message);
    this.name = "ScraperError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export async function scrapeWebPage(targetUrl: string): Promise<ScrapedPage> {
  const urlObj = new URL(targetUrl);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(urlObj.href, {
      signal: controller.signal,
      headers: {
        "User-Agent": BROWSER_USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Sec-Ch-Ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
      },
      redirect: "follow",
    });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new ScraperError(
        "Website took too long to respond. The request timed out after 12 seconds.",
        "TIMEOUT",
        408
      );
    }
    throw new ScraperError(
      "We couldn't access this webpage. Please check the URL and make sure the site is publicly accessible.",
      "NETWORK_ERROR",
      502
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      throw new ScraperError(
        "This website doesn't allow automated access (bot protection or Cloudflare challenge). Please try another public store or landing page.",
        "ACCESS_DENIED",
        403
      );
    }
    if (response.status === 404) {
      throw new ScraperError(
        "The requested page was not found (HTTP 404). Please verify the product or landing page URL.",
        "NOT_FOUND",
        404
      );
    }
    throw new ScraperError(
      `Website returned HTTP status ${response.status} (${response.statusText}).`,
      "HTTP_ERROR",
      response.status
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
    throw new ScraperError(
      `URL returned invalid content type (${contentType}). Only HTML webpages can be audited.`,
      "INVALID_CONTENT_TYPE",
      415
    );
  }

  const rawHtml = await response.text();
  if (!rawHtml || rawHtml.trim().length === 0) {
    throw new ScraperError(
      "The webpage returned an empty document.",
      "EMPTY_BODY",
      422
    );
  }

  const $ = cheerio.load(rawHtml);

  // Extract structured JSON-LD before stripping scripts
  let productFromJsonLd: ScrapedProduct | undefined;
  let hasJsonLd = false;

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const text = $(el).text();
      if (!text) return;
      hasJsonLd = true;
      const data = JSON.parse(text);

      const findProduct = (item: unknown): ScrapedProduct | undefined => {
        if (!item || typeof item !== "object") return undefined;
        const obj = item as Record<string, unknown>;
        const type = String(obj["@type"] || "");

        if (type.toLowerCase() === "product") {
          const product: ScrapedProduct = {};
          if (obj.name) product.title = String(obj.name);
          if (obj.description) product.description = String(obj.description).slice(0, 300);

          // Offers / Price
          const offers = obj.offers as Record<string, unknown> | undefined;
          if (offers) {
            const price = offers.price ?? (Array.isArray(offers) ? offers[0]?.price : undefined);
            const currency = offers.priceCurrency ?? (Array.isArray(offers) ? offers[0]?.priceCurrency : "");
            if (price) product.price = `${currency ? currency + " " : "$"}${price}`;
            const availability = offers.availability ?? (Array.isArray(offers) ? offers[0]?.availability : undefined);
            if (availability) {
              product.availability = String(availability).includes("InStock") ? "In Stock" : "Out of Stock / Limited";
            }
          }

          // AggregateRating
          const rating = obj.aggregateRating as Record<string, unknown> | undefined;
          if (rating) {
            if (rating.ratingValue) product.rating = `${rating.ratingValue}/5`;
            if (rating.reviewCount) product.reviews = `${rating.reviewCount} customer reviews`;
          }

          return product;
        }

        // Search in @graph
        if (Array.isArray(obj["@graph"])) {
          for (const graphItem of obj["@graph"]) {
            const found = findProduct(graphItem);
            if (found) return found;
          }
        }

        return undefined;
      };

      const extracted = findProduct(data);
      if (extracted) {
        productFromJsonLd = extracted;
      }
    } catch {
      // Ignore JSON parse errors in invalid JSON-LD scripts
    }
  });

  // Check Shopify indicators
  const htmlContent = rawHtml.toLowerCase();
  const isShopify =
    htmlContent.includes("cdn.shopify.com") ||
    htmlContent.includes("shopify.theme") ||
    $('meta[name="generator"][content*="shopify" i]').length > 0 ||
    $('form[action*="/cart/add"]').length > 0;

  // Metadata
  const title =
    $("title").first().text().trim() ||
    $('meta[property="og:title"]').attr("content")?.trim() ||
    "";
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    $('meta[name="twitter:description"]').attr("content")?.trim() ||
    "";
  const canonicalUrl =
    $('link[rel="canonical"]').attr("href")?.trim() || targetUrl;

  const hasViewport = $('meta[name="viewport"]').length > 0;

  // Headings
  const headings = {
    h1: $("h1")
      .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
      .get()
      .filter((t) => t.length > 0)
      .slice(0, 10),
    h2: $("h2")
      .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
      .get()
      .filter((t) => t.length > 0)
      .slice(0, 15),
    h3: $("h3")
      .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
      .get()
      .filter((t) => t.length > 0)
      .slice(0, 15),
  };

  // Buttons and CTA links
  const buttons: string[] = [];
  $("button, input[type='submit'], input[type='button'], a.btn, a.button, a[class*='cta'], a[class*='button'], a[class*='btn']")
    .each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim() || $(el).attr("value")?.trim() || $(el).attr("aria-label")?.trim();
      if (text && text.length > 1 && text.length < 50 && !buttons.includes(text)) {
        buttons.push(text);
      }
    });

  // General Links
  const links: string[] = [];
  $("a")
    .each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      const href = $(el).attr("href");
      if (
        text &&
        text.length > 2 &&
        text.length < 60 &&
        href &&
        !href.startsWith("#") &&
        !href.startsWith("javascript:") &&
        !links.includes(text)
      ) {
        links.push(text);
      }
    });

  // Images
  const images: { alt: string; src?: string }[] = [];
  let imagesMissingAlt = 0;
  $("img").each((_, el) => {
    const alt = $(el).attr("alt")?.trim() || "";
    const src = $(el).attr("src") || $(el).attr("data-src") || "";
    if (!alt) imagesMissingAlt++;
    if (images.length < 25) {
      images.push({ alt, src: src.slice(0, 150) });
    }
  });

  // Forms & Inputs
  const forms: { inputs: string[] }[] = [];
  $("form").each((_, formEl) => {
    const inputs: string[] = [];
    $(formEl)
      .find("input, select, textarea")
      .each((_, inputEl) => {
        const type = $(inputEl).attr("type") || inputEl.tagName.toLowerCase();
        const placeholder = $(inputEl).attr("placeholder")?.trim();
        const name = $(inputEl).attr("name")?.trim();
        const label = $(inputEl).attr("aria-label")?.trim();
        inputs.push(placeholder || label || name || type);
      });
    if (inputs.length > 0) {
      forms.push({ inputs: inputs.slice(0, 10) });
    }
  });

  // Try extracting Product details if not already extracted from JSON-LD
  const product: ScrapedProduct = productFromJsonLd ? { ...productFromJsonLd } : {};

  if (!product.title) {
    const titleCandidates = [
      $(".product-single__title, .product__title, h1.product-title, .product-meta__title, [data-product-title]").first().text().trim(),
      headings.h1[0],
      title.split("|")[0].split("-")[0].trim(),
    ];
    product.title = titleCandidates.find((t) => t && t.length > 0);
  }

  if (!product.price) {
    const priceEl = $(
      ".price, .product-price, .price__regular, .money, [data-product-price], .price-item--regular"
    ).first();
    const priceText = priceEl.text().replace(/\s+/g, " ").trim();
    if (priceText && /\$|€|£|\d+\.\d{2}/.test(priceText)) {
      product.price = priceText.slice(0, 30);
    }
  }

  // Compare at price / Discount
  const comparePriceEl = $(
    ".price__sale, .compare-at-price, .price-item--sale, .was-price, del"
  ).first();
  const compareText = comparePriceEl.text().replace(/\s+/g, " ").trim();
  if (compareText && /\$|€|£|\d+/.test(compareText)) {
    product.compareAtPrice = compareText.slice(0, 30);
  }

  // Add to cart text
  const addToCartBtn = $(
    "form[action*='/cart/add'] button, button[name='add'], button[id*='AddToCart'], [data-add-to-cart]"
  ).first();
  if (addToCartBtn.length > 0) {
    product.addToCartText = addToCartBtn.text().replace(/\s+/g, " ").trim() || "Add to Cart";
  }

  // Trust badges & guarantees detected in page
  const trustBadges: string[] = [];
  const pageText = $("body").text().toLowerCase();

  if (pageText.includes("free shipping") || pageText.includes("free delivery")) {
    product.shippingInfo = "Free Shipping detected";
    trustBadges.push("Free Shipping");
  }
  if (pageText.includes("30-day") || pageText.includes("money back") || pageText.includes("guarantee")) {
    product.guarantee = "Money-Back Guarantee / Return Policy detected";
    trustBadges.push("Guarantee");
  }
  if (pageText.includes("secure checkout") || pageText.includes("ssl encrypted") || pageText.includes("256-bit")) {
    trustBadges.push("Secure Checkout");
  }
  if (pageText.includes("reviews") || pageText.includes("rating") || $(".judge-me, .yotpo, .loox, .stamped").length > 0) {
    trustBadges.push("Customer Reviews Widget");
  }
  if (trustBadges.length > 0) {
    product.trustBadges = trustBadges;
  }

  // Clean the DOM to extract readable text
  $(
    "script, style, noscript, svg, iframe, canvas, template, header nav, footer"
  ).remove();

  const paragraphs: string[] = [];
  $("p, li, blockquote, dd")
    .each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text.length > 25 && text.length < 500 && !paragraphs.includes(text)) {
        paragraphs.push(text);
      }
    });

  const fullCleanedText = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  const words = fullCleanedText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Check for client-side rendered / empty shell
  if (wordCount < 40 && headings.h1.length === 0 && buttons.length === 0) {
    const isSpaShell =
      rawHtml.includes('id="root"') ||
      rawHtml.includes('id="__next"') ||
      rawHtml.includes('id="app"') ||
      rawHtml.includes("You need to enable JavaScript");
    if (isSpaShell) {
      throw new ScraperError(
        "This page requires JavaScript rendering (Client-side Single Page Application) and could not be fully analyzed via standard HTML extraction.",
        "JAVASCRIPT_REQUIRED",
        422
      );
    }
  }

  const technicalSignals: ScrapedTechnicalSignals = {
    hasViewport,
    isShopify,
    hasSsl: urlObj.protocol === "https:",
    hasJsonLd,
    wordCount,
    headingsCount: headings.h1.length + headings.h2.length + headings.h3.length,
    buttonCount: buttons.length,
    linkCount: links.length,
    imageCount: $("img").length,
    imagesMissingAlt,
    formCount: forms.length,
  };

  return {
    url: targetUrl,
    title: title.slice(0, 150),
    metaDescription: metaDescription.slice(0, 300),
    canonicalUrl,
    headings,
    paragraphs: paragraphs.slice(0, 25),
    buttons: buttons.slice(0, 15),
    links: links.slice(0, 20),
    images: images.slice(0, 15),
    forms: forms.slice(0, 5),
    product: Object.keys(product).length > 0 ? product : undefined,
    signals: technicalSignals,
    cleanedTextSample: fullCleanedText.slice(0, 2500),
  };
}
