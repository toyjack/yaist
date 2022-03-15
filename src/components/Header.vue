<script setup  lang="ts">
import { reactive } from "vue"
import { useI18n } from "vue-i18n";
import { useStore } from '../stores/settings'

const settings = useStore()
const { locale } = useI18n({ useScope: "global" });

const lang_options = reactive([
  {
    label: "日本語",
    value: "ja"
  },
  {
    label: "English",
    value: "en"
  },
  {
    label: "中文",
    value: "zh"
  },
])

function changeLocale(lang: string) {
  locale.value = lang
}
</script>
<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <!-- <q-avatar>
          <img src="/icon.png" />
        </q-avatar>-->
        YASIT (Yet Another IDS Search Tool)
      </q-toolbar-title>
      <q-btn flat round dense icon="translate" class="q-mr-xs">
        <q-menu>
          <q-list>
            <q-item
              v-for="menu of lang_options"
              @click="changeLocale(menu.value)"
              clickable
              v-close-popup
            >
              <q-item-section>{{ menu.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn dense flat round icon="menu" @click="settings.toggleRightDrawer()" />
    </q-toolbar>
  </q-header>
</template>