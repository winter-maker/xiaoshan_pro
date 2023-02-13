import Vue from "vue";
import App from "./App.vue";
import "./lib/tmap.js";
import "./assets/style/base.css";
import "./lib/lib-flexible.js";
import * as echarts from "echarts";
import { getRequest, postRequest } from "./lib/requestClient";

Vue.config.productionTip = false;
Vue.prototype.$charts = echarts;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
