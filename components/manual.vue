<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">説明</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <h2 class="is-size-3">利用方法</h2>
      <h4 class="is-size-4">検索方法</h4>
      <p>
        「検索部品画数」： 検索したい漢字にある部品を入力してください。 複数の部品でも検索可能です。<br>
        部品の次に、入力した部品を除いた残りの画数（半角アラビア数字）を入力すると、さらに検索の結果を絞り込むことができます。<br>
        例：「土口2」を入力すると、「土」と「口」の部品を除いて残りの画数が「2」画のみの漢字が検索結果に表示されます。<br>

        「分解」ボタンを押すと、入力した漢字を部品に分解します。<br>
        「検索」ボタンを押すと、検索結果が表示されます。<br>
        <br>
        「深層検索」チェックを入れると、部品がより深い階層にある漢字を検索が可能になります。<br>
      </p>
      <h4 class="is-size-4">検索結果の利用</h4>
      <p>
        検索結果の漢字の字形画像をクリックすると、その漢字の情報がクリップボードにコピーされます。<br>
        この情報を、WordやExcelなどのアプリケーションにペーストすると、その漢字が入力できます。<br>
        <br>
        クリップボードにコピーされる情報は、「文字符号」・「Unicodeスカラ値」・「テンプレート」の3種類となっています。<br>
        「文字符号」は、その漢字のUnicode符号です。この情報をペーストすると、その漢字が入力できます。<br>
        「Unicodeスカラ値」は、その漢字のUnicodeスカラ値です（例：「一」は「U+4E00」となります）。<br>
        「テンプレート」は、その漢字の情報を設定したテンプレートとしてコピーされます。テンプレートの設定は画面上にある「設定」による変更が可能です。<br>
        デフォルトのテンプレートはTEIの「glyph」モジュールとなります。<br>
      </p>
      <div class="buttons is-right">
        <b-button label="閉じる" @click="$emit('close')"></b-button>
      </div>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
export default {
  //
};
</script>
