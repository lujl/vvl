<template>
  <nav class="vl-nav">
    <div class="vl-nav__main">
      <h1 class="vl-nav__logo">VVL</h1>
      <div class="vl-nav__fn">
        <i
          class="vl-nav__icon el-icon-full-screen"
          @click="onFullScreen"
          title="全屏"
        ></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "VlNav",
  props: {
    width: {
      type: String,
      default: "200px",
    },
  },
  methods: {
    onFullScreen() {
      function toFullScreen(el) {
        if (el.requestFullscreen) {
          return el.requestFullscreen();
        } else if (el.webkitRequestFullScreen) {
          return el.webkitRequestFullScreen();
        } else if (el.mozRequestFullScreen) {
          return el.mozRequestFullScreen();
        } else {
          return el.msRequestFullscreen();
        }
      }
      toFullScreen(document.documentElement);
    },
  },
};
</script>

<style lang="scss" scoped>
.vl-nav {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #dee2e6;
  .vl-nav__main {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 44px;
    .vl-nav__logo {
      margin-left: 0;
    }
    .vl-nav__fn {
      margin-left: auto;
      .vl-nav__icon {
        margin: 0 5px;
      }
    }
  }
}
</style>
