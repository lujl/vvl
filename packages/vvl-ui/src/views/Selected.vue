<template>
  <div class="vl-selected" :style="activeComponentStyle">
    <div class="vl-selected__mask"></div>
    <div class="vl-selected__actions">
      <i class="el-icon-top" @click="handleActions('up')"></i>
      <i class="el-icon-bottom" @click="handleActions('down')"></i>
      <i class="el-icon-copy-document"></i>
      <i class="el-icon-delete"></i>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { deepClone } from "@/utils/index.js";

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
            console.log(i);
            if (i > 0) {
              if (action == "up") {
                temp = deepClone(arr[i]);
                arr[i] = deepClone(arr[i - 1]);
                arr[i - 1] = temp;
              }
              if (i < arr.length - 1 && action == "down") {
                temp = deepClone(arr[i]);
                arr[i] = deepClone(arr[i + 1]);
                arr[i + 1] = temp;
              }
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
      console.log(data);
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
  .vl-selected__mask {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .vl-selected__actions {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-100%);
    display: flex;
    background-color: #3eaf7c;
    padding: 5px;
    i {
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
