<template>
  <vl-side>
    <div class="panel">
      <div class="panel__header">
        <h3>物料</h3>
      </div>
      <div class="panel__main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="组件" name="component">
            <ul class="panel_ul">
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
    <ComponentTree style="height: 50vh; overflow-y: auto" />
  </vl-side>
</template>
<script>
//import ElementUI from "element-ui";
import { getUID } from "@/utils/index.js";
import { componetsList } from "@/data.js";

import ComponentTree from "./ComponentTree.vue";

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
      newItem.id = getUID();
      if (newItem.children && Array.isArray(newItem.children)) {
        newItem.children.forEach((childItem) => {
          childItem.id = getUID();
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
    .panel_ul {
      height: 100px;
      overflow-y: auto;
    }
  }
}
</style>
