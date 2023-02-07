import Vue from "vue";
import App from "./App.vue";
import "./assets/style/base.css";
import "./lib/lib-flexible.js";
import { getRequest, postRequest } from "./lib/requestClient";

Vue.config.productionTip = false;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
