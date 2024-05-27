import Vue from "vue";
import VueRouter from "vue-router";

// Auth
import Login from "./components/Auth/Login.vue";

import Home from "./components/e-bengkel/Home.vue";
import Sparepart from "./components/e-bengkel/Sparepart.vue";
import SparepartDetail from "./components/e-bengkel/SparepartDetail.vue";
import SparepartModal from "./components/modals/SparepartModal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/sparepart",
        component: Sparepart,
      },
      {
        path: "/sparepart-detail",
        component: SparepartDetail,
      },
      {
        path: "/sparepart-modal",
        component: SparepartModal,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    // meta: {
    //   requestAuth: true
    // }
  },
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes,
});

export default router;
