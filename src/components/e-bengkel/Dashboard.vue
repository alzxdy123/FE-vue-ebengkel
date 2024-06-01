a
<template>
  <div class="sparepart-detail">
    <breadcrumbs :breadcrumbs="breadcrumbs" style="margin-left: 13px" />
    <span class="page-title" style="margin-left: 13px">Dashboard</span>
    <div>
      <b-container fluid class="mt-4">
        <b-row>
          <b-col cols="auto" class="d-flex" style="gap: 20px">
            <div class="box">
              <div class="box-head">Total Sparepart</div>
              <b-spinner v-if="isBusy"></b-spinner>
              <div class="box-body" v-else>
                <span>{{ totalSparepart }}</span>
                <i class="jam jam-check"></i>
              </div>
            </div>
            <div class="box">
              <div class="box-head">Total Vehicle</div>
              <b-spinner v-if="isBusy"></b-spinner>
              <div class="box-body" v-else>
                <span>{{ totalVehicle }}</span>
                <i class="jam jam-check"></i>
              </div>
            </div>
            <div class="box">
              <div class="box-head">Total Order</div>
              <b-spinner v-if="isBusy"></b-spinner>
              <div class="box-body" v-else>
                <span>{{ totalOrder }}</span>
                <i class="jam jam-check"></i>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <div class="chart-box">
              <div class="chart-title">Sparepart Mobil</div>
              <b-spinner v-if="isBusy"></b-spinner>
              <apexchart
                v-else
                height="250"
                type="bar"
                class="chart"
                :options="SparepartChart.chartOptions"
                :series="SparepartChart.chartSeries"
              >
              </apexchart>
            </div>
          </b-col>
          <b-col cols="6"
            ><div class="chart-box">
              <div class="chart-title">Sparepart Motor</div>
              <b-spinner v-if="isBusy"></b-spinner>
              <apexchart
                v-else
                height="250"
                type="bar"
                class="chart"
                :options="SparepartMotorChart.chartOptions"
                :series="SparepartMotorChart.chartSeries"
              >
              </apexchart></div
          ></b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <div class="chart-box">
              <div class="chart-title">Order</div>
              <b-spinner v-if="isBusy"></b-spinner>
              <apexchart
                v-else
                height="250"
                type="bar"
                class="chart"
                :options="totalOrderChart.chartOptions"
                :series="totalOrderChart.chartSeries"
              >
              </apexchart>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import breadcrumbs from "../common/Breadcrumbs.vue";
import DashboardService from "../../services/DashboardService";
import Functions from "../../tools/Functions";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    breadcrumbs,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      breadcrumbs: ["Dashboard"],
      isBusy: false,
      totalSparepart: "",
      totalVehicle: "",
      totalOrder: "",
      totalOrderChart: {
        chartData: {
          years: [],
          total: [],
        },
        chartSeries: [
          {
            name: "Total Order",
            data: [],
          },
        ],
        chartOptions: {},
      },
      SparepartChart: {
        chartData: {
          name: [],
          stock: [],
        },
        chartSeries: [
          {
            name: "Sparepart Mobil",
            data: [],
          },
        ],
        chartOptions: {},
      },
      SparepartMotorChart: {
        chartData: {
          name: [],
          stock: [],
        },
        chartSeries: [
          {
            name: "Sparepart Motor",
            data: [],
          },
        ],
        chartOptions: {},
      },
    };
  },

  methods: {
    HandleFetch() {
      this.isBusy = true;
      DashboardService.Get()
        .then((res) => {
          this.isBusy = false;
          const data = res.data.data;

          this.totalSparepart = data.sparepartCount;
          this.totalVehicle = data.vehicleCount;
          this.totalOrder = data.orderCount;

          const order = res.data.data.order;
          const sparepartCar = res.data.data.sparepartCar;

          const years = order.map((item) => item.year);
          const total = order.map((item) => item.total_orders);

          const names = sparepartCar.map((item) => item.name);
          const stock = sparepartCar.map((item) => item.stock);

          this.totalOrderChart.chartData.years = years;
          this.totalOrderChart.chartSeries[0].data = total;

          this.SparepartChart.chartData.name = names;
          this.SparepartChart.chartSeries[0].data = stock;

          const SparepartMotor = res.data.data.sparepartMotor;
          const namesM = SparepartMotor.map((item) => item.name);
          const stockM = SparepartMotor.map((item) => item.stock);
          this.SparepartMotorChart.chartData.name = namesM;
          this.SparepartMotorChart.chartSeries[0].data = stockM;

          this.totalOrderChart.chartOptions = this.TotalOrderOptions(years);
          this.SparepartChart.chartOptions = this.SparepartOptions(names);
          this.SparepartMotorChart.chartOptions =
            this.SparepartCarOptions(names);
        })
        .catch((err) => {
          console.log("🚀 ~ DashboardService.Get ~ err:", err);
        });
    },

    TotalOrderOptions(categories) {
      return {
        chart: {
          width: "100%",
        },
        xaxis: {
          type: "category",
          categories: categories,
        },
        colors: ["#ffd205"],
        dataLabels: {
          enabled: false,
        },
      };
    },
    SparepartOptions(categories) {
      return {
        chart: {
          width: "100%",
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: "category",
          categories: categories,
        },
        colors: ["#ff0000"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
      };
    },
    SparepartCarOptions(categories) {
      return {
        chart: {
          width: "100%",
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: "category",
          categories: categories,
        },
        colors: ["#053364"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
      };
    },
  },

  mounted() {
    this.HandleFetch();
    let token = Functions.ReadSessionCustom("token");
    console.log(token);
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/dashboard.scss";
</style>
