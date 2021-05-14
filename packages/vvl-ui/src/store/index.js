import Vue from "vue";
import Vuex from "vuex";
import { find, deepClone, getComponentNode } from "@/utils/index.js";
import { broadcast, transfer } from "vuex-iframe-sync";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    componentData: [],
    activeComponent: {},
    style: "",
    script: "",
  },
  mutations: {
    COMPONENTS_PUSH(state, value) {
      console.log("COMPONENTS_PUSH", value);
      state.componentData.push(value);
    },
    COMPONENTS_ACTIVE(state, value) {
      if (!value.attrs && value.id) {
        let componentData = deepClone(state.componentData);
        let target = find(componentData, (item) => {
          return item.id == value.id;
        });
        console.log(
          "COMPONENTS_ACTIVE window:",
          window === window.top,
          componentData,
          target
        );
        if (target) {
          value.attrs = { ...target.attrs };
        }
      }
      state.activeComponent = value;
    },
    COMPONENTS_UPDATE(state, value) {
      console.log("COMPONENTS_UPDATE", value);
      state.componentData = deepClone(value);
    },
    SCRIPT_SAVE(state, value) {
      state.script = value;
      console.log("SCRIPT_SAVE", value);
    },
    STYLE_SAVE(state, value) {
      state.style = value;
      console.log("STYLE_SAVE", value);
    },
  },
  actions: {
    SET_COMPONENTS_ACTIVE({ commit }, node) {
      let componentNode = getComponentNode(node);
      if (componentNode) {
        let target = componentNode.getBoundingClientRect();
        commit("COMPONENTS_ACTIVE", {
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
  },
  modules: {},
  plugins: [window === window.top ? broadcast("viewport-iframe") : transfer()],
});
