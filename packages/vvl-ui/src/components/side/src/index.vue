<template>
  <div class="vl-side" :style="{ width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VlSide",
  props: {
    width: {
      type: String,
      default: "200px",
    },
  },
};
</script>

<style lang="scss" scoped>
.vl-side {
  padding: 10px;
  height: 100%;
}
</style>
