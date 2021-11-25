<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("label.customTemplate") }}</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <p>[[unicode]]は「u4E00」のようなUnicodeスカラ値です。</p>
      <p>[[IDS]]は「⿰口土」のような漢字のIDS情報です。</p>
      <p>[[character]]は漢字符号です。</p>
      <p>
        [[GlyphWikiPNG]]はGlyphWikiのPNG画像URLです。[[GlyphWikiSVG]]にすると、SVGファイルのURLになります。
      </p>
      <br />
      <b-field :label="$t('label.templateField')">
        <b-input
          type="textarea"
          v-model="template"
        ></b-input>
      </b-field>
      <div class="buttons is-right">
        <b-button :label="$t('label.save')" @click="$emit('close')"></b-button>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
export default {
  props: ["xmlTemplate"],
  computed: {
    template: {
      get() {
        return this.$store.state.settings.template;
      },
      set(value) {
        this.$store.commit("settings/updateTemplate", value);
      },
    },
  },
};
</script>
