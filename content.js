(() => {
  "use strict";

  // Static content scripts are automatically installed on each matching page.
  // Avoid broad matches such as any class containing "ad": those often hide
  // ordinary page UI (for example, "header", "load-more", or "address").
  const STYLE_ID = "gogeta-ad-blocker-styles";
  const AD_SELECTOR = [
    "[data-ad]",
    "[data-ad-slot]",
    "[data-google-query-id]",
    "ins.adsbygoogle",
    ".adsbygoogle",
    ".ad-slot",
    ".ad-container",
    ".advertisement",
    ".sponsored-content",
    ".sponsored-post",
    '[aria-label="Advertisement" i]',
    '[aria-label="Sponsored" i]',
    'iframe[src*="doubleclick.net"]',
    'iframe[src*="googlesyndication.com"]',
    'iframe[src*="googleadservices.com"]',
    'iframe[id^="google_ads_iframe"]'
  ].join(",");

  function installStyles() {
    if (!document.documentElement || document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `${AD_SELECTOR} { display: none !important; }`;
    (document.head || document.documentElement).appendChild(style);
  }

  function hideMatching(root) {
    if (!(root instanceof Element)) return;
    if (root.matches(AD_SELECTOR)) root.style.setProperty("display", "none", "important");
    root.querySelectorAll(AD_SELECTOR).forEach((element) => {
      element.style.setProperty("display", "none", "important");
    });
  }

  function scanDocument() {
    installStyles();
    if (document.documentElement) hideMatching(document.documentElement);
  }

  scanDocument();

  const observer = new MutationObserver((mutations) => {
    installStyles();
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => hideMatching(node));
      } else if (mutation.target instanceof Element) {
        hideMatching(mutation.target);
      }
    }
  });

  const observeWhenReady = () => {
    if (!document.documentElement) {
      requestAnimationFrame(observeWhenReady);
      return;
    }
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "id", "src", "aria-label", "data-ad", "data-ad-slot"]
    });
    scanDocument();
  };

  observeWhenReady();
})();
