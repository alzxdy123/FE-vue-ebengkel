import Vue from "vue";
import VueRouter from "vue-router";

// Auth
import Login from "./components/Auth/Login.vue";

import Home from "./components/e-bengkel/Home.vue";
import Dashboard from "./components/e-bengkel/Dashboard.vue";

import Sparepart from "./components/e-bengkel/Sparepart.vue";
import SparepartDetail from "./components/e-bengkel/SparepartDetail.vue";
import SparepartModal from "./components/modals/SparepartModal.vue";

import Vehicle from "./components/e-bengkel/vehicle/Vehicle.vue";
import VehicleDetail from "./components/e-bengkel/vehicle/VehicleDetail.vue";

import Order from "./components/e-bengkel/order/Order.vue";
import OrderDetail from "./components/e-bengkel/order/OrderDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
      },
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
      {
        path: "/vehicle",
        component: Vehicle,
      },
      {
        path: "/vehicle-detail",
        component: VehicleDetail,
      },
      {
        path: "/order",
        component: Order,
      },
      {
        path: "/order-detail",
        component: OrderDetail,
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
