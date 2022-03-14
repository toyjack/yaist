<script setup lang="ts">
import { defineProps } from "vue"
import { useI18n } from "vue-i18n"
import { useQuasar } from 'quasar'
import { useClipboard } from '@vueuse/core'
import { useStore } from "../stores/settings"

const { t } = useI18n({ useScope: "global" });
const $q = useQuasar()
const settings = useStore()

const { text, isSupported, copy } = useClipboard()

const props = defineProps({ hanzi: String, })
const code = props.hanzi.codePointAt(0).toString(16)
const glyphUrl = "https://glyphwiki.org/glyph/u" + code + ".svg"
const overline = "U+" + code.toUpperCase()

const unihanURL = "https://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=" + props.hanzi
const chiseURL = "https://www.chise.org/est/view/character/" + props.hanzi

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

    <q-card-section>
      <div class="text-overline text-orange-9">{{ overline }}</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ hanzi }}</div>
      <div class="text-caption text-grey">{{ code }}</div>
    </q-card-section>

    <q-card-actions>
      <div class="row q-gutter-md wrap">
        <div class="col">
          <q-btn flat color="primary" label="Unihan" :href="unihanURL" target="_blank" />
        </div>
        <div class="col">
          <q-btn flat color="primary" label="Chise" :href="chiseURL" target="_blank" />
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>
