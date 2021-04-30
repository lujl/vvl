<template>
  <vl-side>
    <h3>属性</h3>
    <el-form ref="form" label-width="80px" size="mini">
      <el-form-item
        :label="attrItem.key"
        v-for="attrItem in attrs"
        :key="attrItem.key"
      >
        <el-select
          v-model="attrItem.value"
          placeholder="请选择"
          v-if="attrItem.type == 'select'"
          @change="change(attrItem)"
        >
          <el-option
            v-for="item in attrItem.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- <el-radio-group v-model="attrItem.value" v-if="attrItem.type == 'radio'">
          <el-radio :label="item" v-for="item in attrItem.options">{{item}}</el-radio>
        </el-radio-group> -->
        <el-checkbox
          v-model="attrItem.value"
          v-if="attrItem.type == 'checkbox'"
          @change="change(attrItem)"
        ></el-checkbox>

        <el-input
          v-if="!attrItem.type"
          v-model="attrItem.value"
          @change="change(attrItem)"
        ></el-input>
      </el-form-item>
    </el-form>
  </vl-side>
</template>
<script>
let map = {
  type: "select",
  disabled: "checkbox",
};

import { deepClone, merge, isObject, find, isNumber } from "@/utils/index.js";

import { componetsList } from "@/data.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      id: "",
      attrs: [],
    };
  },
  watch: {
    "$store.state.activeComponent": {
      handler: function (val) {
        if (!val?.attrs) return;

        let target = deepClone(val);
        /*let targetItem = componetsList.find(item => {
          return item.name == target.name
        })*/
        let targetItem = find(componetsList, function (item) {
          return item.name == target.name;
        });

        // 标签不存在组件列表中
        if (!targetItem) return;

        let attrObj = target.attrs;
        merge(attrObj, targetItem.attrs);

        this.id = target.id;
        this.attrs = Object.keys(attrObj).map((attrKey) => {
          let obj = attrObj[attrKey];
          let newObj = {
            key: attrKey,
          };
          if (isObject(obj)) {
            newObj.type = map[attrKey];
            newObj.value = obj.value;
            newObj.options = obj.options.map((item) => {
              return {
                label: item,
                value: item,
              };
            });
          } else {
            newObj.value = obj;
          }
          return newObj;
        });

        console.log("右侧栏 activeComponent", this.attrs);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      componentData: "componentData",
    }),
  },
  methods: {
    change(item) {
      let newArr = deepClone(this.componentData);

      let target = find(newArr, (item) => {
        return item.id == this.id;
      }).attrs;

      if (!target[item.key]) {
        target[item.key] = {};
      }
      if (isObject(target[item.key])) {
        target[item.key].value = item.value;
      } else {
        console.log(target[item.key]);
        // 如果赋值前为数字类型则转为数字类型
        target[item.key] = isNumber(target[item.key])
          ? Number(item.value)
          : item.value;
      }

      console.log(item, target, newArr);

      this.$store.commit("COMPONENTS_UPDATE", newArr);
    },
  },
};
</script>
<style scoped></style>
