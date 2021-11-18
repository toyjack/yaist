<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">XMLテンプレート</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <!-- <p class="title">TEIブロックを編集する</p> -->
      <p>[[unicode]]は「u4E00」のようなUnicodeスカラ値です。</p>
      <p>[[IDS]]は「⿰口土」のような漢字のIDS情報です。</p>
      <p>[[character]]は漢字符号です。</p>
      <p>
        [[GlyphWikiPNG]]はGlyphWikiのPNG画像URLです。[[GlyphWikiSVG]]にすると、SVGファイルのURLになります。
      </p>
      <br>
      <b-field label="TEIブロックのテンプレート">
        <b-input
          type="textarea"
          v-model="xmlTemplate"
          @input="$emit('update:xmlTemplate', $event)"
        ></b-input>
      </b-field>
      <div class="buttons is-right">
        <b-button label="保存" @click="$emit('close')"></b-button>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
export default {
  props: ["xmlTemplate"],
};
</script>
