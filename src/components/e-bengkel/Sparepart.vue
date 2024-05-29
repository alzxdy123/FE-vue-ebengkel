<template>
  <div class="sparepart">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Sparepart</span>
    <div class="tables">
      <div class="form-navigation mb-4">
        <b-container fluid>
          <b-row no-gutters align-h="between">
            <b-col cols="6" class="d-flex">
              <b-form-group class="search full">
                <b-form-input
                  v-model="filterQuery.name"
                  type="text"
                  debounce="500"
                  placeholder="Search"
                ></b-form-input>
                <i class="jam jam-search"></i>
              </b-form-group>
              <b-form-group>
                <b-form-select
                  style="font-size: 13px; margin-left: 10px; width: 150px"
                  v-model="filterQuery.category_id"
                >
                  <option value="0">All category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </b-form-select>
                <b-form-invalid-feedback id="category_id-invalid-feedback">
                  {{ errors.first("category_id") }}
                </b-form-invalid-feedback>
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
        <template v-slot:cell(edit)="data">
          <b-container fluid>
            <b-row align-h="center">
              <b-col cols="auto">
                <b-button
                  v-b-tooltip.hover
                  variant="primary"
                  title="Edit"
                  class="btn-mt circle secondary"
                  @click="HandleEdit(data.item)"
                >
                  <i class="jam jam-write-f text-white"></i>
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

    <sparepartModal
      :actionType="action"
      :categories="categories"
      :sparepart="selectedItem"
      @cancel="handleCancel('sparepart-form-modal')"
      @close="handleCancel('sparepart-form-modal')"
      @saved="HandleData()"
    />
  </div>
</template>

<script>
import SparepartService from "@/services/SparepartService";
import breadcrumbs from "../common/Breadcrumbs.vue";
import SparepartModal from "../modals/SparepartModal.vue";
import DeleteModal from "../modals/DeleteModal.vue";
import Functions from "../../tools/Functions";

export default {
  components: {
    breadcrumbs,
    SparepartModal,
    DeleteModal,
  },
  data() {
    return {
      breadcrumbs: ["Sparepart"],
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
      selectedItem: undefined,
      categories: [],
      filterQuery: {
        name: "",
        category_id: 0,
      },
    };
  },

  methods: {
    HandleData() {
      const query = {
        name: this.filterQuery.name,
        category_id: this.filterQuery.category_id,
      };
      this.tableProps.isBusy = true;
      SparepartService.GetAll(query)
        .then((res) => {
          this.tableProps.isBusy = false;
          this.tableProps.items = res.data.data;
          this.tableProps.errorMessage = "";
        })
        .catch((err) => {
          console.log("🚀 ~ HandleData ~ err:", err);
          this.tableProps.errorMessage = err;
        });
    },

    handleAdd() {
      this.action = "I";
      this.selectedItem = {
        name: "",
        price: "",
        stock: "",
        sparepart_category_id: "",
      };
      this.$nextTick(() => {
        this.$bvModal.show("sparepart-form-modal");
      });
    },

    HandleEdit(item) {
      this.action = "U";
      this.selectedItem = { ...item };
      this.$nextTick(() => {
        this.$bvModal.show("sparepart-form-modal");
      });
    },

    handleCancel(modalId) {
      this.$nextTick(() => {
        this.$bvModal.hide(modalId);
      });
    },

    handleDetail(item) {
      Functions.SaveSessionCustom("sparepartID", item.id);
      Functions.ToPage("/sparepart-detail");
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
      SparepartService.Delete(id)
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
          console.log("🚀 ~ SparepartService.Delete ~ err:", err);
        });

      this.$bvModal.hide("delete-modal");
    },

    fetchSparepartCategory() {
      SparepartService.GetAllCategory()
        .then((res) => {
          this.categories = res.data.data;
        })
        .catch((err) => {
          console.log("🚀 ~ fetchSparepartCategory ~ err:", err);
        });
    },
  },

  watch: {
    filterQuery: {
      handler: function (newVal, oldVal) {
        this.tableProps.currentPage = 1;
        this.HandleData();
      },
      deep: true,
    },
  },

  mounted() {
    this.HandleData();
    this.fetchSparepartCategory();
    Functions.TablePerPage(this.tableProps);
  },
};
</script>

<style lang="scss" scoped></style>
