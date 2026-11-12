# Simple Live Ad Blocker

A lightweight Chrome extension for Chromebooks that blocks requests to some common ad domains and hides many ad elements on the current page. It also watches for new matching elements, so hiding them does not require reloading the page.

> This is a starter project, not a guarantee that every ad will be blocked. Sites may serve ads from their own domains or use sponsored content that cannot reliably be identified as an ad.

## Features

- Blocks requests to several common ad network domains using Chrome's Declarative Net Request API.
- Hides selected ad iframes and elements on the active page.
- Observes page changes and hides matching elements added later.
- Applies the page-element hiding when you click the extension icon.

## Project files

- `manifest.json` — Chrome extension configuration
- `service-worker.js` — injects the content script when the extension button is clicked
- `content.js` — hides matching elements and observes the page for changes
- `rules.json` — network blocking rules

## Install on a Chromebook

1. Put the extension files in one folder.
2. In Chrome, open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder.
5. Open a webpage and click the extension icon to hide matching ads on that page.

Some school- or work-managed Chromebooks may prevent installing unpacked extensions.

## Limitations

- The block list only covers a small set of common ad domains; it will not block every ad.
- The element selectors are heuristics. They may miss ads or, on some sites, hide non-ad content.
- The page-hiding script runs on the active page after you click the extension button. Network rules are applied by Chrome while the extension is enabled.
- Chrome restricts extensions from running on certain pages, such as internal Chrome pages and the Chrome Web Store.

## Customization

Add network rules to `rules.json` and site-specific selectors to the selector list in `content.js`. Be careful when adding broad selectors, since they can hide legitimate page content.
