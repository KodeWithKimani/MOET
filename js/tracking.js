/**
 * Moet Insurance Agency: product interest tracking (GA4)
 *
 * Any element with a data-track attribute is tracked on click.
 *
 *   data-track="product_card_click"   Interest: Learn More cards on the homepage
 *   data-track="quote_click"          Intent:   quote buttons on the products page
 *
 *   data-product="medical"            Product slug
 *   data-category="medical-insurance" Category slug (quote buttons)
 *   data-underwriter="aar"            Optional, sent as-is when present
 *
 * Each click is sent to GA4 with these parameters:
 *   product       slug, e.g. "motor-vehicle"
 *   product_name  readable name taken from the card title, e.g. "Motor Vehicle Insurance"
 *   category      category slug, e.g. "general-insurance"
 *   underwriter   "aar" or "whatsapp" (when present)
 *
 * Adding a new policy needs no JavaScript changes: put the same
 * data attributes on its card and quote button.
 */
(function () {
  "use strict";

  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-track]");
    if (!el) return;

    // Readable name: the title (h3) of the card the clicked link sits in
    var card = el.closest(".sub-card, .insurance-card");
    var titleEl = card ? card.querySelector("h3") : null;
    var productName = titleEl ? titleEl.textContent.trim() : "";

    var slug = el.dataset.product || el.dataset.category || "unknown";

    var params = {
      product: slug,
      product_name: productName || slug,
      // "beacon" lets the hit survive same-tab navigation (homepage -> products page)
      transport_type: "beacon",
    };

    if (el.dataset.category) {
      params.category = el.dataset.category;
    }

    if (el.dataset.underwriter) {
      params.underwriter = el.dataset.underwriter;
    }

    // Helpful when testing locally; harmless in production
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      console.log("[tracking]", el.dataset.track, params);
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", el.dataset.track, params);
    }
  });
})();