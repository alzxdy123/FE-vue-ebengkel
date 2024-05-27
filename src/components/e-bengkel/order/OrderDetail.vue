<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Order</span>
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
      breadcrumbs: ["Order", "Detail"],
    };
  },
};
</script>

<style lang="scss"></style>
