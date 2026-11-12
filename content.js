(() => {
  "use strict";

  const COMMON_SELECTORS = [
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
  ];

  // Keep platform-specific selectors scoped to their own sites. Avoid broad
  // [class*="ad"] rules, which can match ordinary controls and text.
  const YOUTUBE_SELECTORS = [
    "ytd-ad-slot-renderer",
    "ytd-in-feed-ad-layout-renderer",
    "ytd-display-ad-renderer",
    "ytd-promoted-sparkles-web-renderer",
    "ytd-promoted-video-renderer",
    "ytd-companion-slot-renderer",
    "#player-ads",
    "#masthead-ad",
    ".video-ads",
    ".ytp-ad-overlay-container",
    ".ytp-ad-overlay-slot",
    ".ytp-ad-text-overlay",
    ".ytp-ad-image-overlay"
  ];

  const SPOTIFY_SELECTORS = [
    '[data-testid="ad"]',
    '[data-testid="ad-slot"]',
    '[data-testid="ad-banner"]',
    '[data-testid="ad-card"]',
    '[data-testid="audio-ad"]',
    '[data-testid="billboard-ad"]',
    '[aria-label="Advertisement" i]',
    '[aria-label="Sponsored" i]'
  ];

  const hostname = location.hostname.toLowerCase();
  const isYouTube = hostname === "youtube.com" || hostname.endsWith(".youtube.com") || hostname === "youtube-nocookie.com" || hostname.endsWith(".youtube-nocookie.com");
  const isSpotify = hostname === "spotify.com" || hostname.endsWith(".spotify.com");
  const siteSelectors = [
    ...COMMON_SELECTORS,
    ...(isYouTube ? YOUTUBE_SELECTORS : []),
    ...(isSpotify ? SPOTIFY_SELECTORS : [])
  ];
  const AD_SELECTOR = siteSelectors.join(",");
  const STYLE_ID = "gogeta-ad-blocker-styles";

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

  function observeWhenReady() {
    if (!document.documentElement) {
      requestAnimationFrame(observeWhenReady);
      return;
    }
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "id", "src", "aria-label", "data-ad", "data-ad-slot", "data-testid"]
    });
    scanDocument();
  }

  observeWhenReady();
})();
