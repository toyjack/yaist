<script setup lang="ts">
import { defineProps, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar } from 'quasar'
import { useClipboard } from '@vueuse/core'
import { useStore } from "../stores/settings"
import { getUnicodeBlock,gwname2char,gwname2charWithoutIDC } from '../utils/unicode'


const { t } = useI18n({ useScope: "global" });
const $q = useQuasar()
const settings = useStore()

const { text, isSupported, copy } = useClipboard()

const props = defineProps({ hanzi: String, strokes: Number })
const hanzi = ref("")
const strokes = ref(0)

if (props.strokes) strokes.value = props.strokes

const searchRange = settings.searchRange

let code = "0"
let glyphUrl = ""
let overline = ""
let lefBtnLabel = ""
let leftBtnURL = ""
let rightBtnLabel = ""
let rightBtnURL = ""
let rightOverline = ""

if (searchRange == "unicode") {
  if (props.hanzi) {
    hanzi.value = props.hanzi
  }
  code = hanzi.value.codePointAt(0)?.toString(16)
  glyphUrl = "https://glyphwiki.org/glyph/u" + code + ".svg"
  overline = "U+" + code.toUpperCase()
  rightOverline = getUnicodeBlock(props.hanzi)

  lefBtnLabel = "Unihan"
  leftBtnURL = "https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=" + props.hanzi
  rightBtnLabel = "CHISE"
  rightBtnURL = "https://www.chise.org/est/view/character/" + props.hanzi
}

if (searchRange == "glyphwiki") {
  hanzi.value=gwname2char(props.hanzi)
  code = "0"
  glyphUrl = "https://glyphwiki.org/glyph/" + props.hanzi + ".svg"
  overline = "GlyphWiki"

  lefBtnLabel = "GlyphWiki"
  leftBtnURL = "https://glyphwiki.org/wiki/" + props.hanzi
  rightBtnLabel = "CHISE"
  // TODO: drop idc
  rightBtnURL = "https://www.chise.org/ids-find?components=" + gwname2charWithoutIDC(props.hanzi)
}





function copyCard() {
  let toPaste = ""
  if (settings.copyType == "character") toPaste = props.hanzi;
  if (settings.copyType == "code") toPaste = overline;
  if (settings.copyType == "template") {
    toPaste = settings.template as string
    let xmlUnicode = overline
    toPaste = toPaste.replaceAll("[[unicode]]", xmlUnicode);
    // toPaste = toPaste.replaceAll("[[IDS]]", this.getIDS(char));
    // toPaste = toPaste.replaceAll("[[character]]", char);
    // toPaste = toPaste.replaceAll(
    //   "[[GlyphWikiPNG]]",
    //   this.getGwPngUrl(char)
    // );
    // toPaste = toPaste.replaceAll("[[standard]]", this.getStandard(char));
    // toPaste = toPaste.replaceAll(
    //   "[[GlyphWikiSVG",
    //   this.getGwSvgUrl(char)
    // );
  }

  copy(toPaste)
  $q.notify({
    message: t("message.copied"),
    color: 'secondary',
    position: 'center'
  })
}
</script>

<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="glyphUrl" @click="copyCard()" />

    <q-card-section horizontal>
      <q-card-section class="col-5 text-center">
        <div class="text-overline text-orange-9">{{ overline }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ hanzi }}</div>
        <div
          class="text-caption text-grey text-left"
        >{{ $t("label.totalStrokes") }}: {{ props.strokes }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-overline text-orange-9">{{ rightOverline }}</div>
      </q-card-section>
    </q-card-section>
    <q-separator />

    <q-card-actions>
      <div class="row q-gutter-md wrap">
        <div class="col">
          <q-btn flat color="primary" :label="lefBtnLabel" :href="leftBtnURL" target="_blank" />
        </div>
        <div class="col">
          <q-btn flat color="primary" :label="rightBtnLabel" :href="rightBtnURL" target="_blank" />
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>
