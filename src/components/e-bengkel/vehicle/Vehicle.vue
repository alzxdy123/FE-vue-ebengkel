<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Vehicle</span>
    <section></section>
  </div>
</template>

<script>
import breadcrumbs from "../../common/Breadcrumbs.vue";

export default {
  components: {
    breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: ["Vehcile"],
    };
  },
};
</script>

<style lang="scss"></style>
