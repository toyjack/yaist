<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <section class="section">
        <div class="field">
          <label for="searchterm" class="label">{{ $t("label.searchLabel") }}</label>
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
            {{$t('button.decompose')}}
          </b-button>
          <button class="button is-primary" @click="search">{{ $t("button.search")}}</button>
        </div>
      </section>

      <section class="section">
        <div class="field">
          <label for="" class="label">{{$t('label.sortby')}}</label>
          <b-field>
            <b-radio
              v-model="sortStyle"
              name="sortStyle"
              native-value="byUnicode"
            >
              {{$t('option.byunicode')}}
            </b-radio>
          </b-field>
          <b-field>
            <b-radio
              v-model="sortStyle"
              name="sortStyle"
              native-value="byStrokes"
            >
             {{$t('option.bystrokecount')}}
            </b-radio>
          </b-field>
        </div>
      </section>

      <section class="section">
        <div class="field">
          <label for="" class="label">{{$t('label.toPaste')}}</label>
          <b-field>
            <b-radio
              v-model="pasteData"
              name="pasteData"
              native-value="character"
            >
              {{$t('option.pasteCharacter')}}
            </b-radio>
          </b-field>

          <b-field>
            <b-radio
              v-model="pasteData"
              name="pasteData"
              native-value="unicode"
            >
              {{$t('option.pasteUnicode')}}
            </b-radio>
          </b-field>
          <b-field>
            <b-radio v-model="pasteData" name="pasteData" native-value="tei">
              {{$t('option.pasteTemplate')}}
            </b-radio>
          </b-field>
        </div>
      </section>

      <section>
        <b-taglist attached>
          <b-tag type="is-dark">{{$t('label.relatedCharLoaded')}}</b-tag>
          <b-tag type="is-success" v-if="!loadingVariants">{{$t('label.ok')}}</b-tag>
          <b-tag type="is-danger" v-else>{{$t('label.loading')}}</b-tag>
        </b-taglist>
        <div class="buttons">
          <b-button
            :label="$t('label.changeTemplate')"
            type="is-dark"
            @click="isShowXmlCustomize = !isShowXmlCustomize"
          />
        </div>
        <b-modal
          v-model="isShowXmlCustomize"
          trap-focus
          aria-role="dialog"
          has-modal-card
          :aria-label="$t('label.customTemplate')"
          close-button-aria-label="X"
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
        :variants="variants"
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
      variants: {},
      loadingVariants: true,
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
    <mapping type="standard">[[standard]]</mapping>
    <figure>
        <graphic url="[[GlyphWikiPNG]]"/>
    </figure>
</glyph>
`;
    this.fetchIDS();
    this.fetchVariants()
  },
  methods: {
    getTotalStrokes: getTotalStrokes,
    async fetchIDS() {
      const ids = await this.$axios.$get("/cjkvi_ids.txt");
      this.ids = ids;
      this.loadingIDS = false;
    },
    async fetchVariants() {
      const variants = await this.$axios.$get("/variants.json");
      this.variants = variants;
      this.loadingVariants = false;
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
      this.term = temp3.trim().replace(/[\t⿰-⿿]|\[[^\]]+\]/g, "");
    },
  },
};
</script>

<style lang="css">
@import "@creativebulma/bulma-divider";
</style>
