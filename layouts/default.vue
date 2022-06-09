<template>
  <div>
    <nav class="navbar is-fixed-top header has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- <a class="navbar-item" href="/"> HIIDS </a> -->
        <a class="navbar-item" href="/"> YAIST(Yet Another IDS Search Tool) </a>

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
              <nuxt-link :to="switchLocalePath('zh-cn')"><a class="navbar-item"> 中文 </a></nuxt-link>
              <nuxt-link :to="switchLocalePath('ja')"><a class="navbar-item"> 日本語 </a></nuxt-link>
              <nuxt-link :to="switchLocalePath('en')"><a class="navbar-item"> English </a></nuxt-link>

              <!-- <nuxt-link :to="switchLocalePath('zh-cn')"
                ><a class="navbar-item"> Simplified Chinese </a></nuxt-link
              > -->

              <!-- <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a> -->
            </div>
          </div>
          <div class="navbar-item">
            <div class="buttons">
              <b-button :label="$t('label.changeTemplate')" type="is-dark"
                @click="isShowXmlCustomize = !isShowXmlCustomize" />
              <b-button :label="$t('label.manual')" @click="isManualShow = !isManualShow" />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <b-modal v-model="isManualShow" :width="640" scroll="keep">
      <Manual @close="isManualShow = false" />
    </b-modal>
    <b-modal v-model="isShowXmlCustomize" trap-focus aria-role="dialog" has-modal-card
      :aria-label="$t('label.customTemplate')" close-button-aria-label="X" aria-modal>
      <xml-customize @close="isShowXmlCustomize = false" />
    </b-modal>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>

    <footer class="footer">
      <div class="content ">
        <p class="has-text-centered has-text-justified">
          <strong>YAIST</strong> by <a href="https://researchmap.jp/liuguanwei">Guanwei Liu</a>. The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Manual from "../components/manual.vue";
import xmlCustomize from "../components/xmlCustomize.vue";

export default {
  components: { Manual, xmlCustomize },
  data() {
    return {
      isManualShow: false,
      isShowXmlCustomize: false,
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
