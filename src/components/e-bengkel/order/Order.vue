<template>
  <div class="vehicle">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Order</span>
    <div class="tables">
      <div class="form-navigation mb-4">
        <b-container fluid>
          <b-row no-gutters align-h="start">
            <b-col cols="auto">
              <button class="btn-mt primary add-button" @click="handleAdd()">
                <i class="jam jam-plus"></i>
                Tambah
              </button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <b-table
        :fields="tableProps.fields"
        :items="tableProps.items"
        :per-page="tableProps.perpage"
        :current-page="tableProps.currentPage"
        :busy="tableProps.isBusy"
      >
        <template v-slot:table-busy>
          <div class="text-center my-2 loading-table">
            <div class="loading-color">
              <b-spinner
                class="align-middle mr-3"
                v-if="!tableProps.errorMessage"
              ></b-spinner>
              <strong class="text-danger">{{ tableProps.errorMessage }}</strong>
            </div>
          </div>
        </template>
        <template v-slot:cell(detail)="data">
          <b-container fluid>
            <b-row align-h="center">
              <b-col cols="auto">
                <b-button
                  v-b-tooltip.hover
                  variant="primary"
                  title="Detail"
                  class="btn-mt circle secondary"
                  @click="handleDetail(data.item)"
                >
                  <i class="jam jam-files-f"></i>
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <template v-slot:cell(delete)="data">
          <b-container fluid>
            <b-row align-h="center">
              <b-col cols="auto">
                <b-button
                  v-b-tooltip.hover
                  variant="danger"
                  title="Hapus"
                  class="btn-mt circle danger"
                  @click="handleDelete(data.item)"
                >
                  <i class="jam jam-trash-f"></i>
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
      </b-table>
      <div class="footer-table">
        <div class="pagination">
          <b-pagination
            v-model="tableProps.currentPage"
            :total-rows="tableProps.items.length"
            :per-page="tableProps.perpage"
          ></b-pagination>
        </div>
      </div>
    </div>

    <DeleteModal
      @ok="handleConfirmDelete()"
      @cancel="handleCancel('delete-modal')"
      @close="handleCancel('delete-modal')"
    />

    <OrderFormModal
      :actionType="action"
      title="Order"
      @cancel="handleCancel('form-modal')"
      @close="handleCancel('form-modal')"
      @saved="HandleData()"
    />
  </div>
</template>

<script>
import breadcrumbs from "../../common/Breadcrumbs.vue";
import OrderFormModal from "../../modals/OrderFormModal.vue";
import DeleteModal from "../../modals/DeleteModal.vue";
import Functions from "../../../tools/Functions";
import OrderService from "../../../services/OrderService";
import moment from "moment";
import VehicleService from "../../../services/VehicleService";

export default {
  components: {
    breadcrumbs,
    OrderFormModal,
    DeleteModal,
  },
  data() {
    return {
      breadcrumbs: ["Order"],
      tableProps: {
        items: [],
        perpage: 5,
        currentPage: 1,
        errorMessage: "",
        isBusy: false,
        filter: null,
        fields: [
          {
            key: "id",
            visible: true,
            label: "id",
          },
          {
            key: "author.username",
            visible: true,
            label: "User",
          },
          {
            key: "order_date",
            visible: true,
            label: "Date",
            formatter: (value) => moment(value).format("DD MMM YYYY"),
          },
          {
            key: "detail",
            visible: true,
            label: "Details",
            thStyle: {
              width: "75px",
              textAlign: "center",
            },
          },
          {
            key: "delete",
            visible: true,
            label: "Delete",
            thStyle: {
              width: "75px",
              textAlign: "center",
            },
          },
        ],
        errorMessage: "",
      },
      action: "I",
      selectedItem: undefined,
      vehciles: [],
    };
  },

  methods: {
    HandleData() {
      this.tableProps.isBusy = true;
      OrderService.GetAll()
        .then((res) => {
          this.tableProps.isBusy = false;
          this.tableProps.errorMessage = "";
          this.tableProps.items = res.data.data;
        })
        .catch((err) => {
          this.$notify({
            group: "message",
            title: "Error",
            text: err.response.data.message,
            type: "error",
            duration: 5000,
          });
          this.tableProps.errorMessage = err.response.data.message;
        });
    },

    handleAdd() {
      this.action = "I";
      this.$nextTick(() => {
        this.$bvModal.show("form-modal");
      });
    },

    handleCancel(modalId) {
      this.$nextTick(() => {
        this.$bvModal.hide(modalId);
      });
    },

    HandleEdit(item) {
      this.action = "U";
      this.selectedItem = { ...item };
      this.$nextTick(() => {
        this.$bvModal.show("form-modal");
      });
    },

    handleDelete(item) {
      this.selectedItem = item;
      this.$nextTick(() => {
        this.$bvModal.show("delete-modal");
      });
    },

    handleConfirmDelete() {
      const id = this.selectedItem.id;

      this.tableProps.isBusy = true;
      OrderService.Delete(id)
        .then((res) => {
          this.tableProps.isBusy = false;

          this.$notify({
            group: "message",
            title: "Success",
            text: res.data.message,
            type: "success",
            duration: 5000,
          });
          this.HandleData();
        })
        .catch((err) => {
          this.$notify({
            group: "message",
            title: "Error",
            text: err.response.data.message,
            type: "error",
            duration: 5000,
          });
        });

      this.$bvModal.hide("delete-modal");
    },

    handleDetail(item) {
      Functions.SaveSessionCustom("orderID", item.id);
      Functions.ToPage("/order-detail");
    },

    FetchVehicle() {
      VehicleService.GetAll()
        .then((res) => {
          this.vehicles = res.data.data;
        })
        .catch((err) => {
          console.log("🚀 ~ FetchVehicle ~ err:", err);
        });
    },
  },

  mounted() {
    this.HandleData();
    this.FetchVehicle();
    Functions.TablePerPage(this.tableProps);
  },
};
</script>

<style lang="scss"></style>
