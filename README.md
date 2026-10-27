# LI Du Portfolio — v3

This is a static website. No compilation or build tools required.

## Edit in Visual Studio 2022
1. File → Open → Folder → select `li-du-portfolio`.
2. Edit `index.html` for page structure and project cards. All code is line-broken and indented.
3. Edit `style.css` for layout. The v3 overrides are at the bottom.
4. Edit `translations.json` **and** `translations.js` (offline fallback) together for EN/JA/ZH texts. Do not change `data-i18n` keys without updating their dictionary entries.
5. Open `index.html` in Chrome/Edge. Use a local web server for consistent JSON loading.

## Images
- `assets/hero-photo.jpg` is the uploaded sunset travel photo and is already included.
- Optional project screenshots go in `assets/` under these exact names:
  - mobile-rendering.jpg
  - lidar-tutorials.jpg
  - face-tracking.jpg
  - wildlife-atlas.jpg
  - panda-app.jpg
  - wildlife-identification.jpg
  - bim-planning.jpg
  - gesture-interpretation.jpg
  - tape-loop-shadow.jpg
  - sweet-echo.jpg
  - mysotis.jpg

Missing project screenshots automatically leave the existing abstract project illustrations visible.

## Publish
Upload contents of this folder to the root of your GitHub Pages repository (`USERNAME.github.io`), then enable Pages → Deploy from branch → main / root.

The university employment years have been merged for portfolio readability; retain exact appointment dates in a formal CV when required.


## v4 changes
- New panoramic hero photo: `assets/hero-photo.jpg`
- Navigation aligned right, with logo left
- Hero left gradient and gradual blur; highlighted name
- Skills section heading changed to `04 / Skills`
- Skills hover animation: 1.3x on desktop, reduced motion support
- The styling overrides for these features are near the end of `style.css` under `PORTFOLIO v4`.

## v5 additions
- The hero title types one character at a time in all three languages. Edit the text in `index.html` and `translations.json` / `translations.js`.
- New project image slots: `assets/road-vehicle-detection.jpg` and `assets/smart-bicycle.jpg`.
- New hero sizing and placeholders are in the final **PORTFOLIO v5** section of `style.css`.
