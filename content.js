(() => {
  // Avoid installing duplicate observers if the button is clicked again.
  if (window.__simpleLiveAdBlockerInstalled) return;
  window.__simpleLiveAdBlockerInstalled = true;

  const selectors = [
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    'iframe[id*="ad-"]',
    '[aria-label="Advertisement"]',
    '[aria-label="advertisement"]',
    '[data-ad]',
    '[class~=" 광고"]'
  ];

  function hideAds(root = document) {
    for (const selector of selectors) {
      try {
        root.querySelectorAll(selector).forEach((element) => {
          element.style.setProperty("display", "none", "important");
        });
      } catch {
        // Ignore invalid or unsupported selectors.
      }
    }
  }

  hideAds();

  // Hide matching ad elements added later, without reloading the page.
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          hideAds(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();