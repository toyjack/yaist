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

    <footer class="footer columns is-centered is-vcentered is-mobile">
      <div class="column is-narrow has-text-centered ">
        <p><strong>YAIST</strong> by <a href="https://researchmap.jp/liuguanwei">{{ $t("label.author") }}</a>.
          The <a href="https://github.com/toyjack/yaist" target="_blank">source code</a> is licensed <a
            href="http://opensource.org/licenses/mit-license.php">MIT</a>.</p>
        <p>Please refer to the respective links for the licenses of the
          data used by this site: <a href="https://www.chise.org/dataset.ja.html">CHISE</a>, <a
            href="https://glyphwiki.org/wiki/GlyphWiki:%e3%83%97%e3%83%a9%e3%82%a4%e3%83%90%e3%82%b7%e3%83%bc%e3%83%bb%e3%83%9d%e3%83%aa%e3%82%b7%e3%83%bc">GlyphWiki</a>,
          <a href="https://github.com/cjkvi/cjkvi-ids">CJKVI/CJKVI-IDS</a>, <a
            href="https://www.unicode.org/copyright.html">Unihan</a>.
        </p>
        <p>This work was supported by the "<a href="https://www.hi.u-tokyo.ac.jp/en/cdps/datadriven/"
            target="_blank">Construction of
            data-driven historical information research
            infrastructure</a>" project </p>
        <p>of <a href="https://www.hi.u-tokyo.ac.jp/">Historiographical Institute</a>, <a
            href="https://www.u-tokyo.ac.jp/ja/index.html">University of
            Tokyo</a>.</p>

        <!-- 
          https://www.hi.u-tokyo.ac.jp/cdps/datadriven/
          https://www.hi.u-tokyo.ac.jp/en/cdps/datadriven/

          HIのデータ駆動PJ　による

          「このサイトについて」のページを追加


          ivsのunicode出力　を　format
         -->
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
    };
  },
};
</script>
