<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Sparepart</span>
    <section>
      <b-container v-if="isBusy">
        <b-row align-h="center">
          <b-col cols="auto">
            <div class="loading-color">
              <b-spinner class="align-middle mt-2"></b-spinner>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid v-else>
        <b-row style="margin-bottom: 25px">
          <b-col cols="auto" class="title-detail">
            <i class="jam jam-home-f"></i> Details</b-col
          >
        </b-row>
        <b-row>
          <b-col cols="6">
            <div class="d-flex">
              <div class="title mr-3">ID</div>
              <div class="value">{{ item.id }}</div>
            </div>
            <div class="d-flex">
              <div class="title mr-3">Name</div>
              <div class="value">{{ item.name }}</div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="d-flex">
              <div class="title mr-3">Stock</div>
              <div class="value">{{ item.stock }}</div>
            </div>
            <div class="d-flex">
              <div class="title mr-3">Price</div>
              <div class="value">{{ item.price }}</div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="d-flex">
              <div class="title mr-3">Category</div>
              <div class="value">{{ item.category.name }}</div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <b-container fluid>
      <b-row>
        <b-col cols="auto">
          <button class="btn-back" @click="back()">Kembali</button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SparepartService from "../../services/SparepartService";
import Functions from "../../tools/Functions";
import breadcrumbs from "../common/Breadcrumbs.vue";

export default {
  components: {
    breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: ["Sparepart", "Detail"],
      sparepartID: "",
      item: {
        id: 0,
        name: "",
        stock: 0,
        price: 0,
        category: {
          name: "",
        },
      },
      isBusy: false,
    };
  },

  methods: {
    fetchData() {
      this.isBusy = true;
      SparepartService.GetByID(this.sparepartID)
        .then((res) => {
          this.isBusy = false;
          const data = res.data.data;
          this.item = data;
        })
        .catch((err) => {
          console.log("🚀 ~ SparepartService.GetByID ~ err:", err);
        });
    },

    back() {
      Functions.ToPage("/sparepart");
    },
  },

  mounted() {
    const sparepartID = Functions.ReadSessionCustom("sparepartID");
    this.sparepartID = sparepartID;
    this.fetchData();
  },
};
</script>

<style lang="scss"></style>
