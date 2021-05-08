<template>
  <div class="vl-layout">
    <vl-nav></vl-nav>
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
</style>
