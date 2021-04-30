<template>
  <div class="vl-layout">
    <nav class="vl-nav">
      <div class="vl-nav__main">VVL</div>
    </nav>
    <div class="vl-layout__main">
      <LeftSide />
      <Main />
      <RightSide />
    </div>
  </div>
</template>
<script>
import LeftSide from "./LeftSide.vue";
import RightSide from "./RightSide.vue";
import Main from "./Main.vue";

export default {
  components: {
    LeftSide,
    RightSide,
    Main,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.vl-layout {
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  .vl-layout__main {
    display: flex;
    flex-grow: 1;
  }
}
.vl-nav {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #dee2e6;
  .vl-nav__main {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 44px;
  }
}
</style>
