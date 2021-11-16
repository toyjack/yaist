<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          HIDS
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>

      </div>
       <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <div class="button" @click="isManualShow=!isManualShow">説明</div>
              </div>
            </div>
          </div>
        </div>
    </nav>

    <b-modal v-model="isManualShow" :width="640" scroll="keep">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="/static/img/placeholder-1280x960.png" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        未完成
                    </div>
                </div>
            </div>
        </b-modal>

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
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
