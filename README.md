# Gogeta's Ad Blocker

A small Manifest V3 Chrome extension for Chromebook and desktop Chrome. It blocks requests to a set of known ad-serving domains and hides recognizable ad placements, including targeted selectors for YouTube and Spotify. It runs automatically on HTTP and HTTPS pages and watches for matching elements added later.

> **Limits:** No extension can guarantee that it will block every ad. Sites can change their markup, serve ads from their own domains, or deliver ads as part of media streams. This extension does not reliably remove YouTube in-stream video ads or Spotify audio ads; attempting to block media delivery broadly can also break normal playback.

## Features

- Blocks requests matching domains and ad-specific URL paths in `rules.json`.
- Hides common ad slots and explicitly labeled ads.
- Targets common YouTube ad placements and player overlays, plus selected Spotify ad-card markers.
- Observes DOM changes so newly inserted matching elements are hidden without a page reload.
- Uses specific selectors rather than generic `class` substring rules to reduce accidental hiding of normal page controls.

## Install on a Chromebook

1. Download this repository as a ZIP and extract it, or clone it if Git is available.
2. In Chrome, open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extracted project folder (the folder containing `manifest.json`).
5. After installing or updating, reopen YouTube or Spotify tabs so Chrome loads the updated extension code.

Chrome does not allow extensions to run on certain protected pages, such as `chrome://` pages and the Chrome Web Store. Managed school or work devices may restrict unpacked extensions.

## Customize

- Add or remove network filters in `rules.json`. Keep rule IDs unique and use valid Chrome Declarative Net Request rule syntax.
- Adjust the narrow, ad-specific selectors in `content.js`. Avoid generic selectors such as `[class*="ad"]`; they can match normal words and hide unrelated page controls.
- Do not block broad YouTube or Spotify media/CDN domains: that can prevent legitimate video or music playback.

## Project files

- `manifest.json` — extension permissions, automatic content-script registration, and static network rules.
- `rules.json` — domain and ad-path network filters.
- `content.js` — targeted page-element hiding and mutation observer.
- `service-worker.js` — retained from the initial prototype; not required by the current manifest.
- `LICENSE` — MIT license.

## Development

This project uses plain JavaScript and JSON; there is no build step or Python runtime requirement. After editing a file, use **Reload** on `chrome://extensions` to apply extension changes. Reopen affected tabs to load the updated content script.

## License

MIT. See `LICENSE`.
