<template>
  <div class="card">
    <div class="card-content">
      <p class="title">TEIブロックを編集する</p>
      <p>[[unicode]]は「u4E00」のようなUnicodeスカラ値です。</p>
      <p>[[IDS]]は「⿰口土」のような漢字のIDS情報です。</p>
      <p>[[character]]は漢字符号です。</p>
      <p>
        [[GlyphWikiPNG]]はGlyphWikiのPNG画像URLです。[[GlyphWikiSVG]]にすると、SVGファイルのURLになります。
      </p>
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["xmlTemplate"],
};
</script>
