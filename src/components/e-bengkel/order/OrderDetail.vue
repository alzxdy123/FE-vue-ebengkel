<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Order Details</span>
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
              <div class="title mr-3 text-capitalize">Author</div>
              <div class="value">{{ item.author.username }}</div>
            </div>
            <div class="d-flex">
              <div class="title mr-3 text-capitalize">Order Date</div>
              <div class="value">{{ item.order_date }}</div>
            </div>
            <div class="d-flex">
              <div class="title mr-3 text-capitalize">Total Price</div>
              <div class="value">{{ item.actual_total_price }}</div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

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
            <i class="jam jam-home-f"></i> Order List</b-col
          >
        </b-row>
        <b-row>
          <b-col cols="auto">
            <ul class="ml-5 d-flex flex-wrap">
              <li
                v-for="item in item.details"
                :key="item.id"
                class="value mb-1"
              >
                <div class="title">
                  {{ item.quantity }} {{ item.sparepart.name }}
                </div>
                {{ item.total_price }}
              </li>
            </ul>
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
import OrderService from "../../../services/OrderService";
import Functions from "../../../tools/Functions";
import breadcrumbs from "../../common/Breadcrumbs.vue";

export default {
  components: {
    breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: ["Order", "Detail"],
      orderID: "",
      item: {
        id: "",
        order_date: "",
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
      OrderService.GetByID(this.orderID)
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
      Functions.ToPage("/order");
    },
  },

  mounted() {
    const orderID = Functions.ReadSessionCustom("orderID");
    this.orderID = orderID;
    console.log("🚀 ~ mounted ~ orderID:", orderID);
    this.fetchData();
  },
};
</script>

<style lang="scss"></style>
