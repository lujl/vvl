<template>
  <div class="main" :class="{ toggle }">
    <iframe :src="iframePath" class="main__iframe" id="viewport-iframe"></iframe>

    <CodeEditor :toggle.sync="toggle" />

    <Selected />
  </div>
</template>
<script>
import CodeEditor from "./CodeEditor.vue";
import Selected from "./Selected.vue";
const config = require("/vue.config.js")

export default {
  name: "Main",
  components: {
    CodeEditor,
    Selected,
  },
  computed: {
    iframePath() {
      return `${config.publicPath}#/viewport`
    },
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
  .main__iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
}
.main.toggle {
  padding-bottom: 336px;
}
</style>
