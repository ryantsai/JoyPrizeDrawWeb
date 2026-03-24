# Landing Page Package

This folder is a pure front-end landing page package for `Joy Prize Draw`.

## Files

- `index.html`
- `styles.css`
- `script.js`
- `locales/*.js`
- `assets/img/*`

## What it already does

- Uses only static front-end assets, so it can be deployed to most hosting providers as-is.
- Supports all locales currently used by the app:
  - `en`
  - `ja`
  - `zh`
  - `zh-CN`
  - `zh-TW`
  - `ko`
  - `fr`
  - `de`
  - `es`
  - `it`
- Detects browser language on first visit.
- Lets visitors switch language manually and remembers the choice with `localStorage`.

## Current image sources

The page currently uses artwork copied from the Flutter app package:

- `assets/icon/logo.png`
- `assets/icon/store_banner.png`
- `assets/images/gacha_machine.png`
- `assets/images/prize_wheel.png`
- `assets/images/slot_machine.png`
- `assets/images/lottery_machine.png`
- draw mode thumbnails from `assets/images/thumbnail/`

## Best next visual upgrade

The bundled art is strong enough for a polished first release, but the page would convert better with:

1. Two or three real in-app screenshots on actual device frames.
2. One short animated capture or GIF showing a winner reveal.
3. Final store badges or platform links once publishing destinations are ready.

## Local preview

Any static server works. For example:

```powershell
cd C:\Users\ryan.RYAN5080\source\repos\MyApp\flutter_application_1\landingpage
python -m http.server 4173
```

Then open `http://localhost:4173`.
