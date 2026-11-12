# Gogeta's Ad Blocker

A small Manifest V3 Chrome extension for Chromebook and desktop Chrome. It blocks requests to a maintained set of known ad-serving domains and hides several recognizable ad placements. Filtering starts automatically on web pages; there is no need to click the extension button or reload an open page.

> **Limits:** No extension can guarantee that it will block every ad. Ads served from a site's own domain, sponsored content, and new or unlisted ad networks may not be detected. The page-element rules are deliberately targeted, but may occasionally hide a legitimate element on a site that uses the same ad-specific markup.

## Features

- Blocks requests matching domains listed in `rules.json`.
- Hides common ad slots, explicitly labeled ads, and ad-network iframes.
- Observes DOM changes so newly inserted matching elements are hidden without a page reload.
- Runs automatically on HTTP and HTTPS pages in each frame.

## Install on a Chromebook

1. Download this repository as a ZIP and extract it, or clone it if Git is available.
2. In Chrome, open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extracted project folder (the folder containing `manifest.json`).
5. Visit a website. The extension begins filtering automatically; reopen an already-open tab or refresh it once after installing/updating the extension so Chrome loads the new content script.

Chrome does not allow extensions to run on certain protected pages, such as `chrome://` pages and the Chrome Web Store. Managed school or work devices may restrict unpacked extensions.

## Customize

- Add or remove network filters in `rules.json`. Keep rule IDs unique and use valid Chrome Declarative Net Request rule syntax.
- Adjust the narrow, ad-specific selectors in `content.js`. Avoid generic selectors such as `[class*="ad"]`; they can match normal words and hide unrelated page controls.
- Network block rules affect future requests. The DOM observer handles matching ad elements added after the content script starts.

## Project files

- `manifest.json` — extension permissions, automatic content-script registration, and static network rules.
- `rules.json` — domain-based network filters.
- `content.js` — targeted page-element hiding and mutation observer.
- `service-worker.js` — retained from the initial prototype; not required by the current manifest.

## Development

This project uses plain JavaScript and JSON; there is no build step or Python runtime requirement. After editing a file, use **Reload** on `chrome://extensions` to apply extension changes. Site changes may require reopening the affected tab.

## License

MIT. See `LICENSE`.
