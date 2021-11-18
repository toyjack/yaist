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
              v-model="sortStyle"
              name="sortStyle"
              native-value="byUnicode"
            >
              Unicode順
            </b-radio>
          </b-field>
          <b-field>
            <b-radio
              v-model="sortStyle"
              name="sortStyle"
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

      <section>
        <div class="buttons">
          <b-button
            label="TEIブロックをカスタマイズ"
            type="is-dark"
            @click="isShowXmlCustomize = !isShowXmlCustomize"
          />
        </div>
        <b-modal
          v-model="isShowXmlCustomize"
          trap-focus
          aria-role="dialog"
          has-modal-card
          aria-label="XMLテンプレート"
          close-button-aria-label="閉じる"
          aria-modal
        >
          <xml-customize
            :xml-template.sync="xmlBlock"
            @close="isShowXmlCustomize = false"
          />
        </b-modal>
      </section>
    </div>

    <div class="column">
      <Results
        :sorted_results="sorted_results"
        :pasteType="pasteData"
        :xmlTemplate="xmlBlock"
        :idsData="ids"
      />
    </div>
  </div>
  <!-- end for div.columns -->
</template>

<script>
import { idsfind, getTotalStrokes } from "idsfind";
import Results from "../components/results.vue";
import xmlCustomize from "../components/xmlCustomize.vue";

export default {
  name: "HomePage",
  components: { Results, xmlCustomize },
  data() {
    return {
      term: "",
      results: [],
      sortStyle: "byUnicode",
      pasteData: "character",
      ids: {},
      loadingIDS: true,
      isShowXmlCustomize: false,
      xmlBlock: "",
    };
  },
  computed: {
    sorted_results: function () {
      switch (this.sortStyle) {
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
    this.xmlBlock = `<glyph xml:id="[[unicode]]">
    <mapping type="IDS">[[IDS]]</mapping>
    <mapping type="Unicode">[[character]]</mapping>
    <mapping type="standard">hoge</mapping>
    <figure>
        <graphic url="[[GlyphWikiPNG]]"/>
    </figure>
</glyph>
`;
    this.fetchIDS();
  },
  methods: {
    getTotalStrokes: getTotalStrokes,
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
      this.term = temp3.replace(/[\t⿰-⿿]|\[[^\]]+\]/g, "");
    },
  },
};
</script>

<style lang="css">
@import "@creativebulma/bulma-divider";
</style>
