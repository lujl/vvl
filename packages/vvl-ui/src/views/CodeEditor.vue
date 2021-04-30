<template>
  <div class="code-editor">
    <div class="code-editor__header">
      <span @click="handleToggle" class="code-editor__title">
        <i :class="iconClassName"></i>
        代码编辑
      </span>
      <div v-if="toggle">
        <el-button size="mini" @click="handleRunCode">运行代码</el-button>
        <el-button size="mini" @click="handleDownload">下载</el-button>
      </div>
    </div>
    <div class="code-editor__main" v-if="toggle">
      <codemirror :value="code" :options="cmOptions" @input="onCmCodeChange" />
    </div>
  </div>
</template>

<script>
import { toVue, parseVue } from "@/utils/index.js";

import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// theme css
import "codemirror/theme/monokai.css";
// language
import "codemirror/mode/vue/vue.js";
// active-line.js
import "codemirror/addon/selection/active-line.js";

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 2,
        mode: "text/x-vue",
        theme: "monokai",
        lineNumbers: true,
        line: true,
        styleActiveLine: true,
        lineWrapping: true,
        // more CodeMirror options...
      },
      toggle: true,
    };
  },
  computed: {
    iconClassName() {
      return this.toggle ? 'el-icon-s-fold' : 'el-icon-s-unfold'
    }
    /*code: {
      get: function () {
        return this.$store.state.componentData
      },
      set: function (v) {
        this.a = v - 1
      }
    }*/
  },
  watch: {
    "$store.state.componentData": {
      handler: function (val) {
        //this.code = toVue(val)
        let code = toVue(val);
        this.code = prettier.format(code, {
          parser: "vue",
          plugins: [parserHtml],
        });
      },
      immediate: false,
    },
  },
  methods: {
    onCmCodeChange(newCode) {
      this.code = newCode;
    },
    //展开/收起
    handleToggle() {
      this.toggle = !this.toggle;
      this.$emit("update:toggle", this.toggle);
    },
    //运行代码
    handleRunCode() {
      let template = parseVue(this.code, "template");

      let result = this.templateToJSON(template);

      const script = parseVue(this.code, "script");
      this.$store.commit("SCRIPT_SAVE", script);
      this.$store.commit("COMPONENTS_UPDATE", result);
    },
    //下载
    handleDownload() {
      function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }

      download("hello.vue", this.code);
    },
    templateToJSON(html) {
      let uid = 0;
      let el = document.createElement("div");
      el.innerHTML = html;
      function toData(arr) {
        let newArr = [];
        arr.forEach((item) => {
          let attrs = {};
          let attributes = item.attributes;
          Object.keys(attributes).forEach((attrKey) => {
            let attrName = attributes[attrKey].name;
            if (attrName != "data-id") {
              attrs[attrName] = {};
              attrs[attrName].value = item.attributes[attrKey].value;
            }
          });
          let obj = {
            name: item.nodeName.toLocaleLowerCase(),
            id: ++uid,
            text: item.textContent,
            attrs: attrs,
          };
          if (item.children && item.children.length) {
            obj.children = toData(item.children);
          }
          newArr.push(obj);
        });

        return newArr;
      }
      let result = toData(el.children);
      el = null;
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
.code-editor {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 101;
  overflow-x: hidden;
  .code-editor__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 36px;
    padding: 0 14px;
    background: #fff;
    border-top: 1px solid #dee2e6;
    .code-editor__title {
      cursor: pointer;
    }
  }
  .code-editor__main {
    height: 300px;
    overflow-y: auto;
  }
}
</style>
