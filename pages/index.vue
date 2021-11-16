<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <section class="section">
        <div class="field">
          <label for="searchterm" class="label">検索内容</label>
          <div class="control">
            <input
              type="text"
              class="input"
              id="searchterm"
              v-model.trim="term"
              @keyup.enter="search"
            />
          </div>
        </div>

        <div class="buttons is-right">
          <b-button type="is-danger" @click="decompose" :loading="loadingIDS">
            分解
          </b-button>
          <button class="button is-primary" @click="search">検索</button>
        </div>
      </section>

      <section class="section">
        <div class="field">
          <label for="" class="label">結果順序</label>
          <b-field>
            <b-radio
              v-model="resultsSorted"
              name="resultsSorted"
              native-value="byUnicode"
            >
              Unicode順
            </b-radio>
          </b-field>
          <b-field>
            <b-radio
              v-model="resultsSorted"
              name="resultsSorted"
              native-value="byStrokes"
            >
              画数順
            </b-radio>
          </b-field>
        </div>
      </section>

      <section class="section">
        <div class="field">
          <label for="" class="label">ペーストデータ</label>
          <b-field>
            <b-radio
              v-model="pasteData"
              name="pasteData"
              native-value="character"
            >
              文字符号
            </b-radio>
          </b-field>

          <b-field>
            <b-radio
              v-model="pasteData"
              name="pasteData"
              native-value="unicode"
            >
              Unicodeスカラ値
            </b-radio>
          </b-field>
          <b-field>
            <b-radio v-model="pasteData" name="pasteData" native-value="tei">
              TEIブロック
            </b-radio>
          </b-field>
        </div>
      </section>
    </div>

    <div class="column">
      <section class="section">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="result of sorted_results">
            <div class="card">
              <div class="card-image" @click="copyToClipboard(result.char)">
                <b-image
                  class="is-clickable"
                  :src="getGwSvgUrl(result.char)"
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
                        <a
                          :href="
                            'https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=' +
                            result.char
                          "
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {{ result.char }}
                        </a>
                      </span>
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-7">{{ char2Unicode(result.char) }}</p>
                    <p class="subtitle is-7">
                      {{ getUnicodeBlock(result.char) }}
                    </p>
                  </div>
                </div>

                <div class="content">
                  <p class="subtitle is-7">画数：{{ result.stroke }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { idsfind, getTotalStrokes } from "idsfind";
import { char2Unicode, getUnicodeBlock } from "../utils/helper";

export default {
  name: "HomePage",
  data() {
    return {
      term: "",
      results: [],
      resultsSorted: "byUnicode",
      pasteData: "character",
      ids: {},
      loadingIDS: true,
    };
  },
  computed: {
    sorted_results: function () {
      switch (this.resultsSorted) {
        case "byUnicode":
          return this.results.sort(function (a, b) {
            return a.char < b.char ? -1 : 1;
          });
        case "byStrokes":
          return this.results.sort(function (a, b) {
            return Number(a.stroke) < Number(b.stroke) ? -1 : 1;
          });
      }
    },
  },
  mounted() {
    this.fetchIDS();
  },
  methods: {
    async fetchIDS() {
      const ids = await this.$axios.$get("/cjkvi_ids.txt");
      this.ids = ids;
      this.loadingIDS = false;
    },
    search() {
      this.results = [];
      let temp_results = idsfind(this.term, false);
      for (let char of temp_results) {
        this.results.push({
          char: char,
          stroke: this.getTotalStrokes(char),
        });
      }
    },
    convertCodePoints(str) {
      return Array.from(str).map((char) => {
        return char.codePointAt(0).toString(16);
      });
    },
    decompose() {
      let char = Array.from(this.term)[0];
      let temp = this.ids.indexOf("\t" + char + "\t");
      if (temp == -1) {
        return;
      }
      let temp2 = this.ids.indexOf("\n", temp);
      // for local 魔法！触るな！
      // let temp3 = this.ids.substring(temp + 3, temp2-1);
      // for netlify
      let temp3 = this.ids.substring(temp + 3, temp2);
      // console.log(this.convertCodePoints(temp3));
      this.term = temp3.replace(/[\t\u2ff0-\u2fff]|\[[^\]]+\]/g, "");
    },
    getIDS(char) {
      let temp = this.ids.indexOf("\t" + char + "\t");
      if (temp == -1) {
        return;
      }
      let temp2 = this.ids.indexOf("\n", temp);
      // for local 魔法！触るな！
      // let temp3 = this.ids.substring(temp + 3, temp2-1);
      // for netlify
      let temp3 = this.ids.substring(temp + 3, temp2);
      return temp3;
    },
    getTotalStrokes: getTotalStrokes,
    char2Unicode: char2Unicode,
    getUnicodeBlock: getUnicodeBlock,
    getGwPngUrl: function (char) {
      const code = "u" + this.char2Unicode(char).substring(2).toLowerCase();
      const url = "https://glyphwiki.org/glyph/" + code + ".png";
      return url;
    },
    getGwSvgUrl: function (char) {
      const code = "u" + this.char2Unicode(char).substring(2).toLowerCase();
      const url = "https://glyphwiki.org/glyph/" + code + ".svg";
      return url;
    },
    copyToClipboard: function (char) {
      let toPaste = "";
      switch (this.pasteData) {
        case "character":
          toPaste = char;
          break;
        case "unicode":
          toPaste = this.char2Unicode(char);
          break;
        case "tei":
          toPaste = `
<glyph xml:id="${this.char2Unicode(char)}">
    <mapping type="IDS">${this.getIDS(char)}</mapping>
    <mapping type="unicode">${char}</mapping>
    <figure>
        <graphic url="${this.getGwPngUrl(char)}"/>
    </figure>
</glyph>
          `;
      }
      navigator.clipboard.writeText(toPaste).catch((e) => {
        console.error(e);
      });
      this.$buefy.toast.open({
        message: "コピーしました！",
        type: "is-success",
      });
    },
  },
};
</script>

<style lang="css">
.glyph-hover {
  width: 150px;
  height: 150px;
  background-color: #fff;

  box-shadow: 120px 80px 40px 20px #0ff;
  /* in order: x offset, y offset, blur size, spread size, color */
  /* blur size and spread size are optional (they default to 0) */
}
</style>
