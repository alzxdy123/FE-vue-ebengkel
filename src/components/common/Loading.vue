<template>
  <div clas="status-loading">
    <div class="page-loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import Functions from "../../../tools/Functions";
export default {
  data() {
    return {};
  },
  methods: {
    Loading() {
      let PageRefresh = Functions.ReadSessionCustom("page");
      setTimeout(() => {
        return Functions.ToPage(PageRefresh);
      }, 200);
    },
  },
  mounted: function () {
    this.Loading();
  },
};
</script>

<style lang="scss">
.page-loading {
  position: relative;
  top: 231px;
}
</style>
