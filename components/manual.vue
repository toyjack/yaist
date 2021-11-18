<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">説明</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <p>comming soon...</p>
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
