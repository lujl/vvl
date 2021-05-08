<template>
  <vl-side>
    <div class="panel">
      <div class="panel__header">
        <h3>物料</h3>
      </div>
      <div class="panel__main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="组件" name="component">
            <ul>
              <li
                v-for="(item, index) in componetsList"
                :key="index"
                @click="handlePushComponents(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="区块" name="block">区块</el-tab-pane>
          <el-tab-pane label="页面" name="page">页面</el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <h3>结构层级</h3>
    <ComponentTree />
  </vl-side>
</template>
<script>
//import ElementUI from "element-ui";
import { componetsList } from "@/data.js";

import ComponentTree from "./ComponentTree.vue";

let uid = 0;

export default {
  components: {
    ComponentTree,
  },
  data() {
    return {
      componetsList: componetsList,
      activeName: "component",
    };
  },

  methods: {
    handlePushComponents(item) {
      let newItem = { ...item };
      newItem.id = ++uid;
      if (newItem.children && Array.isArray(newItem.children)) {
        newItem.children.forEach((childItem) => {
          childItem.id = ++uid;
        });
      }
      this.$store.commit("COMPONENTS_PUSH", newItem);
    },
  },
};
</script>
<style lang="scss" scoped>
ul li {
  cursor: pointer;
}
.panel {
  margin-bottom: 20px;
  .panel__main {
    padding-bottom: 10px;
    border-bottom: 1px solid #dee2e6;
  }
}
</style>
