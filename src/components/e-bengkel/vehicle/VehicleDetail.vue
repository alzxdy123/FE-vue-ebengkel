<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Vehicle</span>
    <section>
      <b-container v-if="isBusy">
        <b-row align-h="center">
          <b-col cols="auto">
            <div class="loading-color">
              <b-spinner
                class="align-middle mt-2"
                v-if="!errorMessage"
              ></b-spinner>
              <strong>{{ errorMessage }}</strong>
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
              <div class="title mr-3 text-capitalize">Police Number</div>
              <div class="value">{{ item.police_number }}</div>
            </div>
            <div class="d-flex">
              <div class="title mr-3 text-capitalize">Police Number</div>
              <div class="value">{{ item.years }}</div>
            </div>
          </b-col>
          <b-col cols="6">
            <div class="d-flex">
              <div class="title mr-3 text-capitalize">type</div>
              <div class="value">{{ item.type }}</div>
            </div>
            <div class="d-flex">
              <div class="title mr-3 text-capitalize">merk</div>
              <div class="value">{{ item.merk }}</div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="d-flex">
              <div class="title mr-3">Author</div>
              <div class="value">{{ item.author.username }}</div>
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
import VehicleService from "../../../services/VehicleService";
import Functions from "../../../tools/Functions";
import breadcrumbs from "../../common/Breadcrumbs.vue";

export default {
  components: {
    breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: ["Vehicle", "Detail"],
      vehicleID: "",
      item: {
        id: 0,
        police_number: "",
        type: "",
        merk: "",
        years: 0,
        author: {
          username: "",
        },
      },
      isBusy: false,
      errorMessage: "",
    };
  },

  methods: {
    fetchData() {
      this.isBusy = true;
      VehicleService.GetByID(this.vehicleID)
        .then((res) => {
          this.isBusy = false;
          const data = res.data.data;
          this.item = data;
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
          this.$notify({
            group: "message",
            title: "Error",
            text: err.response.data.message,
            type: "error",
            duration: 5000,
          });
        });
    },

    back() {
      Functions.ToPage("/vehicle");
    },
  },

  mounted() {
    const vehicleID = Functions.ReadSessionCustom("vehicleID");
    this.vehicleID = vehicleID;
    this.fetchData();
  },
};
</script>

<style lang="scss"></style>
