import Nav from "./src/index";

/* istanbul ignore next */
Nav.install = function (Vue) {
  Vue.component(Nav.name, Nav);
};

export default Nav;
