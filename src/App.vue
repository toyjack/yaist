<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia"
import { fetch } from "./fetch"
import { useStore } from "./stores/settings"

import ResultCard from "./components/ResultCard.vue";
import Header from './components/Header.vue'
import Footer from "./components/Footer.vue";
import RightDrawer from "./components/RightDrawer.vue";

const { t } = useI18n({ useScope: "global" });
const settings = useStore()
const { sortType, copyType, searchRange } = storeToRefs(settings)

const search_range_options = reactive([
  {
    label:  t("option.unicode"),
    value: "unicode",
    disable: false,
  },
  {
    label:  t("option.glyphwiki"),
    value: "glyphwiki",
    disable: false,
  },
])

const sort_options = reactive([
  {
    label: t("option.byunicode"),
    value: "unicode",
    disable: false,
  },
  {
    label: t("option.bystrokecount"),
    value: "stroke",
    disable: true,
  },
]);
const copy_options = reactive([
  {
    label: t("option.pasteCharacter"),
    value: "character",
    disable: false,
  },
  {
    label: t("option.pasteUnicode"),
    value: "code",
    disable: false,
  },
  {
    label: t("option.pasteTemplate"),
    value: "template",
    disable: true,
  },
]);

const searching_parts = ref("田又");
const results = ref(<any[]>[]);
const isLoading = ref(false)
const decomposeIsLoading = ref(false)

const search = async () => {
    results.value = [];
    isLoading.value = true
  if (searchRange.value == "unicode") {
    const { isFetching, error, data } = await fetch("/search/ids/" + searching_parts.value).get().json()
    if (error.value) console.log(error.value)
    for (const ele of data.value) {
      // console.log(ele)
      let temp = {
        hanzi: ele,
        strokes: 0
      }
      const { isFetching, error, data } = await fetch("/search/strokes/" + ele).get().json()
      temp["strokes"] = Number(data.value["stroke"])
      results.value.push(temp)
    }
    isLoading.value = false
  }
  if (searchRange.value=="glyphwiki"){
    const { isFetching, error, data } = await fetch("/search/glyphwiki/" + searching_parts.value).get().json()
    if (error.value) console.log(error.value)
    // console.log(data.value)
    for (const ele of data.value) {
      let temp = {
        hanzi: ele,
        strokes: 0
      }
      results.value.push(temp)

    }
    isLoading.value = false
  }
}

const decompose = async () => {
  if (searching_parts.value) {
    decomposeIsLoading.value = true
    const hanzi = searching_parts.value[0]
    const { isFetching, error, data } = await fetch("/search/cjkvi/" + hanzi).get().json()
    searching_parts.value = data.value.ids.replace(/[\t⿰-⿿]|\[[^\]]+\]/g, "")
    decomposeIsLoading.value = false
  }
}

</script>

<template>
  <q-layout view="hHh lpR fFf">
    <Header />

    <RightDrawer />

    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-12 col-md-2">
            <div class="q-ma-md">
              <div class="column q-gutter-md">
                <div class="col">
                  <q-input outlined v-model="searching_parts" :label="$t('label.searchLabel')" />
                </div>
                <div class="col q-gutter-md self-end">
                  <q-btn
                    color="white"
                    text-color="black"
                    :label="$t('button.decompose')"
                    @click="decompose()"
                  />
                  <q-btn
                    color="primary"
                    :label="$t('button.search')"
                    :loading="isLoading"
                    @click="search"
                  />
                </div>

                <q-space />

                <div class="col">
                  <div class="q-pa-md">
                    {{ $t("label.searchRange") }}
                    <q-option-group
                      :options="search_range_options"
                      type="radio"
                      v-model="searchRange"
                    />
                  </div>
                </div>

                <q-space />

                <div class="col">
                  <div class="q-pa-md">
                    {{ $t("label.sortby") }}
                    <q-option-group :options="sort_options" type="radio" v-model="sortType" />
                  </div>
                </div>

                <q-space />

                <div class="col">
                  <div class="q-pa-md">
                    {{ $t("label.toPaste") }}
                    <q-option-group :options="copy_options" type="radio" v-model="copyType" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-10">
            <div class="row wrap q-gutter-md q-ma-md">
              <div class="col-2" v-for="item of results" :key="item">
                <ResultCard :hanzi="item.hanzi" :strokes="item.strokes" />
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <Footer />
  </q-layout>
</template>
