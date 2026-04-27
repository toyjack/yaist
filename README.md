# YAIST — Yet Another IDS Search Tool

[![Netlify Status](https://api.netlify.com/api/v1/badges/af2af95f-55be-4d15-aec2-383ba52875eb/deploy-status)](https://app.netlify.com/sites/hi-ids/deploys)

A static web app for searching CJK (Chinese/Japanese/Korean) unified ideographs by their **Ideographic Description Sequences (IDS)**. Built with Nuxt 2 and deployed on Netlify.

## Features

- Search CJK characters by IDS components (e.g. search `⿰木子` to find characters composed of 木 and 子)
- Results show GlyphWiki SVG glyphs, Unicode code points, stroke counts, and Unicode block (CJK through Ext. J)
- IVS (Ideographic Variation Sequence) support with selectable variant glyphs
- Clipboard copy in three formats: raw character, `U+XXXX` code point, or TEI/XML template
- Customizable XML/TEI paste template
- Variant/related character display
- Interface available in Japanese, English, and Simplified Chinese

## Data Sources

| File | Purpose |
|------|---------|
| `static/cjkvi_ids.txt` | Raw IDS data from [CJKVI-IDS](https://github.com/cjkvi/cjkvi-ids) |
| `static/variants.json` | Variant and related character mappings |
| `static/IVD_Sequences.txt` | IVD sequences from the Unicode IVD registry |

Glyph images are fetched from [GlyphWiki](https://glyphwiki.org).

## Requirements

**Node.js < 17** is required due to the OpenSSL legacy provider dependency.

## Setup

```bash
# Install dependencies
npm install

# Dev server at localhost:3000
npm run dev

# Production build
npm run build
npm run start

# Generate static site
npm run generate
```

## Tech Stack

- [Nuxt 2](https://nuxtjs.org) — SSR disabled, static output
- [Buefy](https://buefy.org) / [Bulma](https://bulma.io) — UI components and styling
- [idsfind](https://www.npmjs.com/package/idsfind) — IDS-based character search engine
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — Internationalization (ja / en / zh-cn)
- [@nuxtjs/axios](https://axios.nuxtjs.org) — Static data loading

## License

MIT License — Copyright (c) 2021 Guanwei Liu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
