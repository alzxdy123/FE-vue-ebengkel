<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Dashbord</span>
    <section></section>
  </div>
</template>

<script>
import breadcrumbs from "../common/Breadcrumbs.vue";
import DashboardService from "../../services/DashboardService";
import Functions from "../../tools/Functions";

export default {
  components: {
    breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: ["Dashboard"],
    };
  },

  methods: {
    HandleFetch() {
      DashboardService.Get()
        .then((res) => {
          console.log("🚀 ~ DashboardService.Get ~ res:", res.data.data);
        })
        .catch((err) => {
          console.log("🚀 ~ DashboardService.Get ~ err:", err);
        });
    },
  },

  mounted() {
    this.HandleFetch();
    let token = Functions.ReadSessionCustom("token");
    console.log(token);
  },
};
</script>

<style lang="scss"></style>
