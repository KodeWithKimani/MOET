/**
 * Moet Insurance Agency: product interest tracking (GA4)
 *
 * Any element with a data-track attribute is tracked on click.
 *
 *   data-track="product_card_click"   Interest: Learn More cards on the homepage
 *   data-track="quote_click"          Intent:   quote buttons on the products page
 *
 *   data-product="medical"            Product slug (same as the section id on products.html)
 *   data-underwriter="aar"            Optional, sent as-is when present
 *
 * Adding a new policy needs no JavaScript changes: put the same
 * data attributes on its card and quote button.
 */
(function () {
  "use strict";

  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-track]");
    if (!el) return;

    var params = {
      product: el.dataset.product || el.dataset.category || "unknown",
      // "beacon" lets the hit survive same-tab navigation (homepage -> products page)
      transport_type: "beacon",
    };

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
