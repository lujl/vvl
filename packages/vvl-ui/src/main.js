import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import RegisterUIComponents from "./register-ui-components";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(RegisterUIComponents);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
