import Side from "./src/index";

/* istanbul ignore next */
Side.install = function (Vue) {
  Vue.component(Side.name, Side);
};

export default Side;
