<template>
  <el-tree
    :data="treeData"
    :props="defaultProps"
    node-key="id"
    default-expand-all
    @node-click="handleNodeClick"
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    draggable
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    ref="a"
  >
  </el-tree>
</template>
<script>
import { mapState } from "vuex";
import { getIframeNodeById } from "@/utils/index.js";

export default {
  name: "ComponentTree",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  computed: {
    ...mapState({
      treeData: "componentData",
    }),
  },
  methods: {
    handleNodeClick(node) {
      let currentNode = getIframeNodeById(node.id);
      this.$store.dispatch("SET_COMPONENTS_ACTIVE", currentNode);
    },
    handleDragStart(node, ev) {
      console.log("drag start", node, ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label, ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label, ev);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label, ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", draggingNode, dropNode, dropType, ev);
    },
    // 拖拽成功完成时触发的事件
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", draggingNode, dropNode, dropType, ev);
      this.$store.commit("COMPONENTS_UPDATE", this.treeData);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    // 判断节点能否被拖拽
    allowDrag(draggingNode) {
      console.log(draggingNode);
      return true;
    },
  },
};
</script>
<style lang="scss" scoped></style>
