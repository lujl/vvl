<template>
  <div ref="display" @click="handlerView($event)" id="viewport"></div>
</template>

<script>
import { toVue, parseVue } from "@/utils/index.js";
import Vue from "vue";

export default {
  data() {
    return {
      code: "",
      component: "",
      html: "",
      js: "",
      css: "",
    };
  },
  watch: {
    "$store.state.componentData": {
      handler: function (val) {
        this.code = toVue(val, false);
        this.destroyCode();
        this.renderCode();

        //console.log('1A', this.$store.state.activeComponent)
        //this.updateSelectedEl()
      },
      immediate: false,
    },
  },
  methods: {
    updateSelectedEl() {
      console.log("updateSelectedEl");
      let { id, name } = this.$store.state.activeComponent;
      console.log(id);
      if (!id) return;
      this.$nextTick(() => {
        let el = document.querySelector(`#viewport [data-id="${id}"]`);
        if (!el) return;
        let target = el.getBoundingClientRect();
        this.$store.commit("COMPONENTS_ACTIVE", {
          id,
          name,
          style: {
            width: target.width + "px",
            height: target.height + "px",
            left: target.left - 200 + "px",
            top: target.top + window.pageYOffset - 83 + "px",
          },
        });
      });
    },
    handlerView(e) {
      let componentNode = this.getComponentNode(e.target);
      if (componentNode) {
        let target = componentNode.getBoundingClientRect();
        let sideWidth = 200;
        let headHeight = 44;
        this.$store.commit("COMPONENTS_ACTIVE", {
          id: componentNode.dataset.id,
          name: componentNode.dataset.name,
          style: {
            width: target.width + "px",
            height: target.height + "px",
            left: target.left - sideWidth + "px",
            top: target.top + window.pageYOffset - headHeight + "px",
          },
        });
      }
    },
    getComponentNode(node) {
      while (node.id !== "viewport" && !node.dataset.id) {
        node = node.parentNode;
      }
      return node.id == "viewport" ? "" : node;
    },
    splitCode() {
      const script = parseVue(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = parseVue(this.code, "style");
      const template =
        '<div id="app">' + parseVue(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;

      console.log("html:", this.html, "css:", this.css, "js:", this.js);
    },
    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        const parseStrToFunc = new Function(this.js)();

        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();
        //console.log(this.component)

        this.$refs.display.appendChild(this.component.$el);
      }
    },
    destroyCode() {
      //const $target = document.getElementById(this.id);
      //if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
  },
  beforeDestroy() {
    this.destroyCode();
  },
};
</script>
<style lang="scss" scoped>
#viewport {
  height: 100%;
  overflow-y: auto;
}
</style>
