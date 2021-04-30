import Side from "@/components/side";

const components = [Side];

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
};
