# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Requires Node.js < 17** (due to OpenSSL legacy provider requirement).

```bash
npm install         # install dependencies
npm run dev         # dev server at localhost:3000
npm run build       # production build (uses --openssl-legacy-provider)
npm run generate    # generate static site
npm run start       # start production server
```

No test suite exists in this project.

## Architecture

YAIST (Yet Another IDS Search Tool) is a **Nuxt 2 static SPA** for searching CJK (Chinese/Japanese/Korean) characters by their Ideographic Description Sequences (IDS). SSR is disabled; it targets static deployment (Netlify).

### Data Flow

On mount, `pages/index.vue` fetches three static data files via axios and loads them into Vuex:

| File | Store module | Purpose |
|------|-------------|---------|
| `/static/cjkvi_ids.txt` | `store/ids.js` | Raw tab-delimited IDS data (CJKVI-IDS) |
| `/static/variants.json` | `store/variants.js` | Variant/related character mappings |
| `/static/IVD_Sequences.txt` | `store/ivd.js` | IVD sequences parsed into `{ codepoint: [ivsCode, ...] }` |

The `idsfind` npm package performs the actual IDS-based character search. The `decompose` function in `index.vue` parses `cjkvi_ids.txt` directly as raw string with index-based lookup (not line-split).

### Component Structure

- `layouts/default.vue` — navbar (lang switcher, template editor, manual modal), footer
- `pages/index.vue` — search input, sort/paste-type controls, triggers search via `idsfind`
- `components/results.vue` — renders grid of Card components
- `components/card.vue` — per-character card: GlyphWiki SVG image, Unicode info, stroke count, IVS modal, clipboard copy
- `components/xmlCustomize.vue` — modal to edit the XML/TEI paste template
- `components/manual.vue` — help modal
- `components/terms.vue` — displays parsed search term characters

### Key Utilities

`utils/helper.js` provides:
- `char2Unicode` / `charCode2Unicode` — handles surrogate pairs for CJK Extension B+
- `getUnicodeBlock(char)` — returns block name (CJK, Ext. A through J)
- `convertCodePoints(str)` — converts a string to an array of hex code point strings
- `getGwSvgUrl` / `getGwPngUrl` — GlyphWiki image URLs

### Paste Modes

Cards support three clipboard copy formats (stored in `store/settings.js`):
- `character` — the raw character (or char+IVS selector)
- `unicode` — `U+XXXX` code point string
- `tei` — fills an XML template with `[[unicode]]`, `[[IDS]]`, `[[character]]`, `[[standard]]`, `[[GlyphWikiSVG]]`, `[[GlyphWikiPNG]]` placeholders

### i18n

Locales: `ja` (default), `en`, `zh-cn`. Message files in `i18n/` directory, aggregated by `i18n/index.js` and passed to `nuxt.config.js`.
