<template>
  <div class="sparepart">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Sparepart</span>
    <div class="tables">
      <div class="form-navigation mb-4">
        <b-container fluid>
          <b-row no-gutters align-h="between">
            <b-col cols="3">
              <b-form-group class="search full">
                <b-form-input
                  v-model="tableProps.filter"
                  type="text"
                  debounce="500"
                  placeholder="Search"
                ></b-form-input>
                <i class="jam jam-search"></i>
              </b-form-group>
            </b-col>
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
        :filter="tableProps.filter"
      >
        <template v-slot:cell(detail)="">
          <b-container fluid>
            <b-row align-h="center">
              <b-col cols="auto">
                <b-button
                  v-b-tooltip.hover
                  variant="primary"
                  title="Detail"
                  class="btn-mt circle secondary"
                >
                  <i class="jam jam-files-f"></i>
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <template v-slot:cell(edit)="">
          <b-container fluid>
            <b-row align-h="center">
              <b-col cols="auto">
                <b-button
                  v-b-tooltip.hover
                  variant="primary"
                  title="Edit"
                  class="btn-mt circle secondary"
                >
                  <i class="jam jam-write-f text-white"></i>
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <template v-slot:cell(delete)="">
          <b-container fluid>
            <b-row align-h="center">
              <b-col cols="auto">
                <b-button
                  v-b-tooltip.hover
                  variant="primary"
                  title="Hapus"
                  class="btn-mt circle danger"
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
  </div>
</template>

<script>
import SparepartService from "@/services/SparepartService";
import breadcrumbs from "../common/Breadcrumbs.vue";

export default {
  components: {
    breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: ["Sparepart"],
      tableProps: {
        items: [],
        perpage: 5,
        currentPage: 1,
        filter: null,
        fields: [
          {
            key: "id",
            visible: true,
            label: "id",
          },
          {
            key: "name",
            visible: true,
            label: "Name",
          },
          {
            key: "price",
            visible: true,
            label: "Price",
          },
          {
            key: "stock",
            visible: true,
            label: "Stock",
          },
          {
            key: "category.name",
            visible: true,
            label: "Category",
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
            key: "edit",
            visible: true,
            label: "Edit",
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
      },
      action: "I",
    };
  },

  methods: {
    HandleData() {
      SparepartService.GetAll()
        .then((res) => {
          console.log("🚀 ~ SparepartService.GetAll ~ data:", res.data.data);
          this.tableProps.items = res.data.data;
        })
        .catch((err) => {
          console.log("🚀 ~ HandleData ~ err:", err);
        });
    },

    RowsItems() {
      return this.tableProps.items.length;
    },
  },

  mounted() {
    this.HandleData();
  },
};
</script>

<style lang="scss" scoped></style>
