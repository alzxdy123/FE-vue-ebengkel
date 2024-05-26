<template>
  <div class="breadcrumbs">
    <div v-for="(crumb, index) in breadcrumbs" :key="index">
      <div v-if="index === 0">
        <i class="jam jam-home-f"></i><i class="jam jam-chevron-right"></i>
        <span>{{ crumb }}</span>
      </div>
      <div v-else-if="index === breadcrumbs.length - 1">
        <i class="jam jam-chevron-right"></i>
        <span class="active">{{ crumb }}</span>
      </div>
      <div v-else>
        <i class="jam jam-chevron-right"></i>
        <span>{{ crumb }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Breadcrumbs",
  props: {
    breadcrumbs: {
      type: Array,
      default: [""],
    },
  },
};
</script>
