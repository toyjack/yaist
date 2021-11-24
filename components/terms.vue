<template>
  <div class="section">
    <div class="divider">
      <!-- {{ $t("label.numberOfResults") }} {{ sorted_results.length }} -->
      入力した部品：{{terms.length}}
    </div>
    <div class="columns is-multiline">
      <div class="column is-3" v-for="term of terms" :key="term">
        <div class="card">
          <div class="card-image" @click="copyToClipboard(term)">
            <b-image
              class="is-clickable"
              :src="getGwSvgUrl(term)"
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
                    {{ term }}
                  </span>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-7">
                  <a
                    :href="
                      'https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=' +
                      term
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ char2Unicode(term) }}
                  </a>
                </p>

                <p class="subtitle is-7">
                  {{ getUnicodeBlock(term) }}
                </p>
              </div>
            </div>

            <div class="content">
              {{ $t("label.totalStrokes") }}：{{ getTotalStrokes(term) }}
              <br />
              {{ $t("label.relatedChar") }}：{{ getStandard(term) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  char2Unicode,
  getUnicodeBlock,
  getGwSvgUrl,
  getGwPngUrl,
} from "../utils/helper";
import { getTotalStrokes } from "idsfind";

export default {
  props: ["terms", "pasteType", "xmlTemplate", "idsData", "variants"],
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
          toPaste = this.xmlTemplate;
          xmlUnicode = xmlUnicode.replace("U+", "u");
          toPaste = toPaste.replaceAll("[[unicode]]", xmlUnicode);
          toPaste = toPaste.replaceAll("[[IDS]]", this.getIDS(char));
          toPaste = toPaste.replaceAll("[[character]]", char);
          toPaste = toPaste.replaceAll(
            "[[GlyphWikiPNG]]",
            this.getGwPngUrl(char)
          );
          toPaste = toPaste.replaceAll("[[standard]]", this.getStandard(char));
          toPaste = toPaste.replaceAll(
            "[[GlyphWikiSVG",
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
  },
};
</script>
