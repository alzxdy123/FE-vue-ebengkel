import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue-apexcharts";
import Notifications from "vue-notification";
// import VueJamIcons from "vue-jam-icons";
// import i18n from "./tools/lang";

import "jam-icons/css/jam.min.css";
import "./assets/scss/init.scss";

import VeeValidate, { Validator } from "vee-validate";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import id from "vee-validate/dist/locale/id";
import en from "vee-validate/dist/locale/en";
Validator.localize("id", id);
Validator.localize("en", en);

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
});
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  store: store,
  // i18n,
  render: (h) => h(App),
}).$mount("#app");
