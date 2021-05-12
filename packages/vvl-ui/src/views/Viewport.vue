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
      styleId: Date.now(),
    };
  },
  watch: {
    "$store.state.componentData": {
      handler: function (val) {
        this.code = toVue(
          {
            componentData: val,
            style: this.$store.state.style,
          },
          false
        );
        this.destroyCode();
        this.renderCode();
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
        this.$store.commit("COMPONENTS_ACTIVE", {
          id: componentNode.dataset.id,
          name: componentNode.dataset.name,
          style: {
            width: target.width + "px",
            height: target.height + "px",
            left: target.left + "px",
            top: target.top + window.pageYOffset + "px",
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
    },
    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        const parseStrToFunc = new Function(this.js)();

        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();
        //console.log(this.component)

        //渲染样式
        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.styleId;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
        this.$refs.display.appendChild(this.component.$el);
      }
    },
    destroyCode() {
      //移除样式
      const $target = document.getElementById(this.styleId);
      if ($target) $target.parentNode.removeChild($target);

      //移除组件
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
