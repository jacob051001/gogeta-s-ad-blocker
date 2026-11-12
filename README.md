# Gogeta's Ad Blocker

A lightweight browser extension for Chrome on Chromebooks that hides common ad elements and blocks some ad network requests without reloading the page.

## What it does

- Blocks requests to common ad domains using Chrome's Declarative Net Request API.
- Hides likely ad iframes and elements on the current page.
- Watches for newly inserted ad content and hides it automatically.
- Makes it easy to customize for your own preferred ad-blocking rules.

## Files in this project

- `manifest.json` — extension configuration
- `service-worker.js` — runs when you click the extension icon
- `content.js` — hides ad elements and observes the page for new ones
- `rules.json` — ad-domain block list
- `README.md` — setup and usage guide
- `.gitignore` — ignores local editor and system files
- `LICENSE` — MIT license

## Install on a Chromebook

1. Download or clone this repository.
2. Open Chrome and visit `chrome://extensions`.
3. Turn on Developer mode.
4. Click `Load unpacked`.
5. Select the folder containing this extension.
6. Open a website and click the extension icon to apply the ad filter on the current tab.

## Notes

- This is a practical starter project, not an all-in-one guarantee of perfect ad blocking.
- Some ads still slip through because websites can use first-party ads, custom ad scripts, or sponsored content.
- Managed Chromebooks or school/work devices may block installing unpacked extensions.

## Customization

- Update `rules.json` to add or remove blocked domains.
- Update the selector list in `content.js` to target more ads or fewer false positives.
- If you add more advanced filters, keep them narrow so normal site content is not hidden.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
