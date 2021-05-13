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
    handlerView(e) {
      this.$store.dispatch("SET_COMPONENTS_ACTIVE", e.target);
    },
    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        const parseStrToFunc = new Function(this.js)();

        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();
        //console.log(this.component)
        //new Component().$mount('#app')

        //渲染样式
        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.styleId;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
        /* document.addEventListener('click', e => {
          this.$store.dispatch("SET_COMPONENTS_ACTIVE", e.target);
        })*/
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
