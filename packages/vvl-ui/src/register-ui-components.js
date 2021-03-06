import Side from "@/components/side";
import Nav from "@/components/nav";

const components = [Side, Nav];

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
};
