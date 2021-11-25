<template>
  <div class="section">
    <div class="divider">
      <!-- {{ $t("label.numberOfResults") }} {{ sorted_results.length }} -->
      入力した部品：{{ terms.length }}
    </div>
    <div class="columns is-multiline">
      <div class="column is-3" v-for="term of terms" :key="term">
        <Card :result="term" :pasteType="pasteType" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./card.vue";

export default {
  props: ["terms", "pasteType"],
  components: { Card },
};
</script>
