<template>
  <div class="main" :class="{ toggle }">
    <!-- <TreeComponent :data="componentData" /> -->
    <Viewport />

    <CodeEditor :toggle.sync="toggle" />

    <Selected />
  </div>
</template>
<script>
//import TreeComponent from "./TreeComponent.vue";
import Viewport from "./Viewport.vue";
import CodeEditor from "./CodeEditor.vue";
import Selected from "./Selected.vue";

export default {
  name: "Main",
  components: {
    Viewport,
    CodeEditor,
    Selected,
  },
  data() {
    return {
      toggle: true,
    };
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  flex-grow: 1;
  padding-bottom: 36px;
  background-color: #f8f9fa;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
}
.main.toggle {
  padding-bottom: 336px;
}
</style>
