<template>
  <div class="columns">
    <div class="menu column is-one-quarter">
      <section class="section">
        <div class="field">
          <label for="searchterm" class="label">{{
            $t("label.searchLabel")
          }}</label>
          <div class="control">
            <input
              type="text"
              class="input"
              id="searchterm"
              v-model.trim="term"
              @keydown.enter="search"
            />
          </div>
        </div>

        <div class="buttons is-right">
          <b-button type="is-danger" @click="decompose" :loading="loadingIDS">
            {{ $t("button.decompose") }}
          </b-button>
          <button class="button is-primary" @click="search">
            {{ $t("button.search") }}
          </button>
        </div>
        <b-field>
          <b-checkbox v-model="ifDeeply">{{$t("button.ifDeeply")}}</b-checkbox>
        </b-field>
      </section>

      <section class="section">
        <div class="field">
          <label for="" class="label">{{ $t("label.sortby") }}</label>
          <b-field>
            <b-radio
              v-model="sortStyle"
              name="sortStyle"
              native-value="byUnicode"
            >
              {{ $t("option.byunicode") }}
            </b-radio>
          </b-field>
          <b-field>
            <b-radio
              v-model="sortStyle"
              name="sortStyle"
              native-value="byStrokes"
            >
              {{ $t("option.bystrokecount") }}
            </b-radio>
          </b-field>
        </div>
      </section>

      <section class="section">
        <div class="field">
          <label for="" class="label">{{ $t("label.toPaste") }}</label>
          <b-field>
            <b-radio
              v-model="pasteType"
              name="pasteType"
              native-value="character"
            >
              {{ $t("option.pasteCharacter") }}
            </b-radio>
          </b-field>

          <b-field>
            <b-radio
              v-model="pasteType"
              name="pasteType"
              native-value="unicode"
            >
              {{ $t("option.pasteUnicode") }}
            </b-radio>
          </b-field>
          <b-field>
            <b-radio v-model="pasteType" name="pasteType" native-value="tei">
              {{ $t("option.pasteTemplate") }}
            </b-radio>
          </b-field>
        </div>
      </section>

      <section>
        <b-taglist attached>
          <b-tag type="is-dark">{{ $t("label.relatedCharLoaded") }}</b-tag>
          <b-tag type="is-success" v-if="!loadingVariants">{{
            $t("label.ok")
          }}</b-tag>
          <b-tag type="is-danger" v-else>{{ $t("label.loading") }}</b-tag>
        </b-taglist>
      </section>
    </div>

    <div class="column">
      <Terms :terms="termList" />
      <Results :sorted_results="sorted_results" />
    </div>
  </div>
  <!-- end for div.columns -->
</template>

<script>
import { idsfind } from "idsfind";
import Results from "../components/results.vue";
import Terms from "../components/terms.vue";
import { uniq } from "lodash";

export default {
  name: "HomePage",
  components: { Results, Terms },
  data() {
    return {
      term: "",
      ifDeeply: false,
      results: [],
      sortStyle: "byUnicode",
      loadingIDS: true,
      loadingVariants: true,
    };
  },
  computed: {
    ids() {
      return this.$store.state.ids.data;
    },
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
    termList() {
      const terms = Array.from(this.term);
      let termArr = [];
      for (let char of terms) {
        if (/\d/.test(char)) {
          continue;
        } else {
          termArr.push(char);
        }
      }
      return termArr;
    },
    pasteType: {
      get() {
        return this.$store.state.settings.pasteType;
      },
      set(value) {
        this.$store.commit("settings/updatePasteType", value);
      },
    },
  },
  mounted() {
    this.xmlBlock = `<glyph xml:id="[[unicode]]">
    <mapping type="IDS">[[IDS]]</mapping>
    <mapping type="Unicode">[[character]]</mapping>
    <mapping type="alt">[[standard]]</mapping>
    <figure>
        <graphic url="[[GlyphWikiSVG]]"/>
    </figure>
</glyph>
`;
    this.$store.commit("settings/updateTemplate", this.xmlBlock);
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const ivd = await this.$axios.get("/IVD_Sequences.txt");
      this.$store.commit("ivd/load", ivd);

      const ids = await this.$axios.$get("/cjkvi_ids.txt");
      this.$store.commit("ids/load", ids);
      this.loadingIDS = false;

      const variants = await this.$axios.$get("/variants.json");
      this.$store.commit("variants/load", variants);
      this.loadingVariants = false;
    },

    search() {
      // this.results = [];
      this.results.splice(0)
      this.$buefy.toast.open({
        message: "検索を実行します...",
        type: "is-info",
      });
      let results = uniq(idsfind(this.term, this.ifDeeply));
      this.updateData(results);
    },
    updateData(data) {
      if (!data.length) {
        this.$buefy.toast.open({
          message: "検索は完了しました",
          type: "is-info",
        });
        return;
      }
      requestAnimationFrame(async () => {
        const num = 100;
        this.results.push(...data.slice(0, num));
        this.updateData(data.slice(num));
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
      this.term = temp3.trim().replace(/[\t⿰-⿿]|\[[^\]]+\]/g, "");
    },
  },
};
</script>

<style lang="css">
@import "@creativebulma/bulma-divider";

.menu {
  position: sticky;
  display: inline-block;
  vertical-align: top;
  max-height: 100vh;
  overflow-y: auto;
  width: 200px;
  top: 0;
  bottom: 0;
  padding: 30px;
}

.content {
  display: inline-block;
}
</style>
