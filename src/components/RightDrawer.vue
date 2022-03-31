<script setup lang="ts">
// import { storeToRefs } from "pinia";
import { useStore } from '../stores/settings'

const settings = useStore()

const settingMenuList = [
  {
    icon: 'setting',
    label: 'Setting',
    separator: true
  },
]




</script>

<template>
  <q-drawer v-model="settings.rightDrawerOpen" side="right" overlay elevated>
    <!-- drawer content -->
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in settingMenuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>