<template>
  <section class="section">
    <!-- あんまり効かなかった -->
    <b-loading
      :is-full-page="false"
      v-model="ifLoading"
      :can-cancel="false"
    ></b-loading>
    <div class="divider">
      {{ $t("label.numberOfResults") }} {{ sorted_results.length }}
    </div>
    <div class="columns is-multiline">
      <div class="column is-3" v-for="result of sorted_results" :key="result">
        <Card :result="result" :pasteType="pasteType" />
      </div>
    </div>
  </section>
</template>

<script>
import Card from "../components/card.vue";

export default {
  components: { Card },
  data() {
    return {
      ifLoading: true,
      isComponentModalActive: false,
    };
  },
  props: ["sorted_results", "pasteType"],
  mounted(){
    this.ifLoading = false
  }
};
</script>
