<template>
  <div class="vl-selected" :style="activeComponentStyle">
    <div class="vl-selected__mask"></div>
    <div class="vl-selected__actions">
      <div class="vl-selected__el">{{activeComponent.name}}</div>
      <div class="vl-selected__inner">
        <i
          class="el-icon-top"
          @click="handleActions('up')"
          title="向上移动组件"
        ></i>
        <i
          class="el-icon-bottom"
          @click="handleActions('down')"
          title="向下移动组件"
        ></i>
        <i
          class="el-icon-copy-document"
          @click="handleActions('copy')"
          title="复制组件"
        ></i>
        <i
          class="el-icon-delete"
          @click="handleActions('delete')"
          title="删除组件"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { deepClone, each, getUID } from "@/utils/index.js";

export default {
  name: "Selected",
  computed: {
    ...mapState({
      componentData: "componentData",
      activeComponent: "activeComponent",
    }),
    activeComponentStyle() {
      return this.activeComponent.style;
    },
  },
  data() {
    return {};
  },
  methods: {
    handleActions(action) {
      let data = deepClone(this.componentData);

      function handleFind(arr, id) {
        let temp;
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i];
          if (item.id == id) {
            console.log("i", i);
            if (action == "up" && i > 0) {
              temp = deepClone(arr[i]);
              arr[i] = deepClone(arr[i - 1]);
              arr[i - 1] = temp;
            } else if (action == "down" && i < arr.length - 1) {
              temp = deepClone(arr[i]);
              arr[i] = deepClone(arr[i + 1]);
              arr[i + 1] = temp;
            } else if (action == "copy") {
              temp = [deepClone(arr[i])];
              each(temp, function (data) {
                data.id = getUID();
              });
              arr.splice(i + 1, 0, temp[0]);
            } else if (action == "delete") {
              arr.splice(i, 1);
            }
            break;
          } else if (item.children) {
            handleFind(item.children, id);
          }
          /*if (args && args(item)) {
            target = item
            break
          } else if (item.children) {
            target = find(item.children, args)
          }*/
        }
      }
      handleFind(data, this.activeComponent.id);
      this.$store.commit("COMPONENTS_UPDATE", data);
      this.$store.commit("COMPONENTS_ACTIVE", {});
    },
  },
};
</script>
<style lang="scss" scoped>
.vl-selected {
  position: absolute;
  left: -99999px;
  border: 1px solid #3eaf7c;
  z-index: 100;
  background-color: rgba(62, 175, 124, 0.3);
  pointer-events: none;
  .vl-selected__mask {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .vl-selected__actions {
    display: flex;
    justify-content: space-between;
    min-width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-100%);
    pointer-events: none;
    i {
      font-size: 20px;
      color: #fff;
    }
    .vl-selected__inner {
      background-color: #3eaf7c;
      padding: 2px 4px;
      display: flex;
      align-items: center;
      pointer-events: auto;
    }
    .vl-selected__el {
      display: inline-block;
      white-space: nowrap;
      padding: 2px 4px;
      background-color: #3eaf7c;
      color: #fff;
    }
  }
}
</style>
