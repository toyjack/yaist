<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <!-- <a class="navbar-item" href="/"> HIIDS </a> -->
        <a class="navbar-item" href="/"> YAIST(Yet Another Ids Search Tool) </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Lang </a>

            <div class="navbar-dropdown">
              <nuxt-link :to="switchLocalePath('zh-cn')"
                ><a class="navbar-item"> 中文 </a></nuxt-link
              >
              <nuxt-link :to="switchLocalePath('ja')"
                ><a class="navbar-item"> 日本語 </a></nuxt-link
              >
              <nuxt-link :to="switchLocalePath('en')"
                ><a class="navbar-item"> English </a></nuxt-link
              >
              
              <!-- <nuxt-link :to="switchLocalePath('zh-cn')"
                ><a class="navbar-item"> Simplified Chinese </a></nuxt-link
              > -->
              

              <!-- <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a> -->
            </div>
          </div>
          <div class="navbar-item">
            <div class="buttons">
              <div class="button" @click="isManualShow = !isManualShow">
                {{ $t("label.manual") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <b-modal v-model="isManualShow" :width="640" scroll="keep">
      <Manual @close="isManualShow = false" />
    </b-modal>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import Manual from "../components/manual.vue";
export default {
  components: { Manual },
  data() {
    return {
      isManualShow: false,
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" },
        },
      ],
    };
  },
};
</script>
