<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Details</span>
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
      breadcrumbs: ["Vehicle", "Detail"],
    };
  },
};
</script>

<style lang="scss"></style>
