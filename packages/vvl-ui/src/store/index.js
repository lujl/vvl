import Vue from "vue";
import Vuex from "vuex";
import { find, deepClone } from "@/utils/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    componentData: [],
    activeComponent: {},
    script: "",
  },
  mutations: {
    COMPONENTS_PUSH(state, value) {
      console.log("COMPONENTS_PUSH", value);
      state.componentData.push(value);
    },
    COMPONENTS_ACTIVE(state, value) {
      if (!value.attrs) {
        //let target = find(state.componentData, value.id)
        let componentData = deepClone(state.componentData);
        let target = find(componentData, function (item) {
          return item.id == value.id;
        });
        value.attrs = { ...target.attrs };
      }
      console.log("COMPONENTS_ACTIVE", value);
      state.activeComponent = value;
    },
    COMPONENTS_UPDATE(state, value) {
      console.log("COMPONENTS_UPDATE", value);
      state.componentData = deepClone(value);
    },
    SCRIPT_SAVE(state, value) {
      state.script = value;
    },
  },
  actions: {
    /*setComponentsActive ({ commit }, value) {
      commit(COMPONENTS_ACTIVE, value)
    },*/
  },
  modules: {},
});
