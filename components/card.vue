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
        {{ $t("label.totalStrokes") }}：{{   getTotalStrokes(result) }}
        <br />
        {{ $t("label.relatedChar") }}：{{ getStandard(result) }}
      </div>
    </div>
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

export default{
  props:['result'],
  computed:{
    pasteType(){
      return this.$store.state.settings.pasteType;
    },
    template(){
      return this.$store.state.settings.template;
    },
    idsData(){
      return this.$store.state.ids.data;
    },
    variants(){
      return this.$store.state.variants.data;
    }
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
}

</script>
