import Vue from "vue";
import VueRouter from "vue-router";

// Auth
import Login from "./components/Auth/Login.vue";

import Home from "./components/e-bengkel/Home.vue";
import Dashboard from "./components/e-bengkel/Dashboard.vue";

import Sparepart from "./components/e-bengkel/Sparepart.vue";
import SparepartDetail from "./components/e-bengkel/SparepartDetail.vue";
import SparepartModal from "./components/modals/FormModal.vue";

import Vehicle from "./components/e-bengkel/vehicle/Vehicle.vue";
import VehicleDetail from "./components/e-bengkel/vehicle/VehicleDetail.vue";

import Order from "./components/e-bengkel/order/Order.vue";
import OrderDetail from "./components/e-bengkel/order/OrderDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/sparepart",
        component: Sparepart,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/sparepart-detail",
        component: SparepartDetail,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/sparepart-modal",
        component: SparepartModal,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/vehicle",
        component: Vehicle,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/vehicle-detail",
        component: VehicleDetail,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/order",
        component: Order,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/order-detail",
        component: OrderDetail,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  let token = localStorage.getItem("token");

  if (authRequired && token == null) {
    return next({
      path: "/login",
      query: {
        returnUrl: to.path,
      },
    });
  } else {
    next();
  }
});

export default router;
