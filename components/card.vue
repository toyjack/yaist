<template>
  <div class="card">
    <div class="card-image" @click="copyToClipboard(result)">
      <b-image
        class="is-clickable"
        :src="getGwSvgUrl(result)"
        ratio="1by1"
        lazy
        placeholder="gazou"
      ></b-image>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-32x32">
            <span class="is-size-2">
              {{ result }}
            </span>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-7">
            <a
              :href="
                'https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=' +
                result
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ char2Unicode(result) }}
            </a>
          </p>

          <p class="subtitle is-7">
            {{ getUnicodeBlock(result) }}
          </p>
        </div>
      </div>

      <div class="content">
        {{ $t("label.totalStrokes") }}：{{ getTotalStrokes(result) }}
        <br />
        {{ $t("label.relatedChar") }}：{{ getStandard(result) }}
      </div>
    </div>
    <footer class="card-footer">
      <a
        class="card-footer-item"
        v-if="ifHasIvs(result)"
        @click="getIvs(result)"
        >IVS</a
      >
      <b-modal v-model="ifIvsPanel">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="ivs of ivsList" :key="ivs">
            <div class="card">
              <div class="card-image">
                <a class="image is-4by3" @click="copyIvs(result,ivs)">
                  <img
                    :src="getIvsGlyphWikiSvg(result, ivs)"
                    alt="Placeholder image"
                  />
                </a>
              </div>
              <div class="card-content">
                <div class="content">
                  IVS: {{ ivs }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <!-- <a class="card-footer-item">Edit</a>
      <a class="card-footer-item">Delete</a> -->
    </footer>
  </div>
</template>

<script>
import { getTotalStrokes } from "idsfind";
import {
  char2Unicode,
  getUnicodeBlock,
  getGwSvgUrl,
  getGwPngUrl,
} from "../utils/helper";

export default {
  props: ["result"],
  data() {
    return {
      ifIvsPanel: false,
      ivsList: [],
    };
  },
  computed: {
    pasteType() {
      return this.$store.state.settings.pasteType;
    },
    template() {
      return this.$store.state.settings.template;
    },
    idsData() {
      return this.$store.state.ids.data;
    },
    variants() {
      return this.$store.state.variants.data;
    },
    ivd() {
      return this.$store.state.ivd.data;
    },
  },
  methods: {
    getTotalStrokes: getTotalStrokes,
    getGwSvgUrl: getGwSvgUrl,
    char2Unicode: char2Unicode,
    getUnicodeBlock: getUnicodeBlock,
    getGwPngUrl: getGwPngUrl,
    getIDS(char) {
      let temp = this.idsData.indexOf("\t" + char + "\t");
      if (temp == -1) {
        return;
      }
      let temp2 = this.idsData.indexOf("\n", temp);
      // for local 魔法！触るな！
      // let temp3 = this.ids.substring(temp + 3, temp2-1);
      // for netlify
      let temp3 = this.idsData.substring(temp + 3, temp2);
      return temp3.trim();
    },
    getStandard(char) {
      if (this.variants[char] == undefined) {
        return "X";
      } else {
        return this.variants[char].join("");
      }
    },
    async copyToClipboard(char) {
      let toPaste = "";
      let xmlUnicode = this.char2Unicode(char);
      switch (this.pasteType) {
        case "character":
          toPaste = char;
          break;
        case "unicode":
          toPaste = this.char2Unicode(char);
          break;
        case "tei":
          toPaste = this.template;
          xmlUnicode = xmlUnicode.replace("U+", "u").toLowerCase();
          toPaste = toPaste.replaceAll("[[unicode]]", xmlUnicode);
          toPaste = toPaste.replaceAll("[[IDS]]", this.getIDS(char));
          toPaste = toPaste.replaceAll("[[character]]", char);
          toPaste = toPaste.replaceAll(
            "[[GlyphWikiPNG]]",
            this.getGwPngUrl(char)
          );
          toPaste = toPaste.replaceAll("[[standard]]", this.getStandard(char));
          toPaste = toPaste.replaceAll(
            "[[GlyphWikiSVG]]",
            this.getGwSvgUrl(char)
          );
      }
      await navigator.clipboard.writeText(toPaste).catch((e) => {
        console.error(e);
      });
      this.$buefy.toast.open({
        message: this.$t("message.copied"),
        type: "is-success",
      });
    },
    copyIvs(char, ivs) {
      const template = this.template;
      const xmlid= "u" + char2Unicode(char).substring(2).toLowerCase()+'-'+"u" + ivs.toLowerCase()
      const char_ivs=char+String.fromCodePoint(parseInt('0x'+ivs,16))
      let toPaste= template
      toPaste = toPaste.replaceAll("[[unicode]]", xmlid);
      toPaste = toPaste.replaceAll("[[IDS]]", this.getIDS(char));
      toPaste = toPaste.replaceAll("[[character]]", char_ivs);
      toPaste = toPaste.replaceAll("[[standard]]", this.getStandard(char));
      toPaste = toPaste.replaceAll("[[GlyphWikiPNG]]", this.getIvsGlyphWikiPng(char, ivs));
      toPaste = toPaste.replaceAll("[[GlyphWikiSVG]]", this.getIvsGlyphWikiSvg(char, ivs));
      navigator.clipboard.writeText(toPaste).catch((e) => {
        console.error(e);
      });
      this.$buefy.toast.open({
        message: this.$t("message.copied"),
        type: "is-success",
      });
    },
    getIvs(char) {
      this.ivsList = [];
      const code = char2Unicode(char).substring(2).toUpperCase();
      if (this.ivd[code] === undefined) {
        return false;
      } else {
        this.ifIvsPanel = true;
        this.ivsList = this.ivd[code];
        return true;
      }
    },
    getIvsGlyphWikiSvg(char, ivs) {
      const code = "u" + char2Unicode(char).substring(2).toLowerCase();
      const selector = "u" + ivs.toLowerCase();
      const url =
        "https://glyphwiki.org/glyph/" + code + "-" + selector + ".svg";
      return url;
    },
    getIvsGlyphWikiPng(char, ivs) {
      const code = "u" + char2Unicode(char).substring(2).toLowerCase();
      const selector = "u" + ivs.toLowerCase();
      const url =
        "https://glyphwiki.org/glyph/" + code + "-" + selector + ".png";
      return url;
    },
    ifHasIvs(char) {
      const code = char2Unicode(char).substring(2).toUpperCase();
      if (this.ivd[code] === undefined) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
