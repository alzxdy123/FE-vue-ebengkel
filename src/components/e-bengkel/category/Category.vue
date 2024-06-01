<template>
  <div class="sparepart">
    <breadcrumbs :breadcrumbs="breadcrumbs" />
    <span class="page-title">Sparepart Category</span>
    <div class="tables">
      <div class="form-navigation mb-4">
        <b-container fluid>
          <b-row no-gutters align-h="between">
            <b-col cols="3" class="d-flex">
              <b-form-group class="search full">
                <b-form-input
                  v-model="filterQuery.name"
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

    <CategoryFormModal
      :actionType="action"
      :category="selectedItem"
      title="Sparepart category"
      @cancel="handleCancel('form-modal')"
      @close="handleCancel('form-modal')"
      @saved="HandleData()"
    />
  </div>
</template>

<script>
import breadcrumbs from "../../common/Breadcrumbs.vue";
import DeleteModal from "../../modals/DeleteModal.vue";
import Functions from "../../../tools/Functions";
import CategoryFormModal from "../../modals/CategoryFormModal.vue";
import CategoryService from "../../../services/CategoryService";

export default {
  components: {
    breadcrumbs,
    CategoryFormModal,
    DeleteModal,
  },
  data() {
    return {
      breadcrumbs: ["Sparepart", "Category"],
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
      },
    };
  },

  methods: {
    HandleData() {
      const query = {
        name: this.filterQuery.name,
      };
      this.tableProps.isBusy = true;
      CategoryService.GetAll(query)
        .then((res) => {
          this.tableProps.isBusy = false;
          this.tableProps.items = res.data.data;
          this.tableProps.errorMessage = "";
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
      this.selectedItem = {
        name: "",
      };
      this.$nextTick(() => {
        this.$bvModal.show("form-modal");
      });
    },

    HandleEdit(item) {
      this.action = "U";
      this.selectedItem = { ...item };
      this.$nextTick(() => {
        this.$bvModal.show("form-modal");
      });
    },

    handleCancel(modalId) {
      this.$nextTick(() => {
        this.$bvModal.hide(modalId);
      });
    },

    // handleDetail(item) {
    //   Functions.SaveSessionCustom("sparepartID", item.id);
    //   Functions.ToPage("/sparepart-detail");
    // },

    handleDelete(item) {
      this.selectedItem = item;
      this.$nextTick(() => {
        this.$bvModal.show("delete-modal");
      });
    },

    handleConfirmDelete() {
      const id = this.selectedItem.id;

      this.tableProps.isBusy = true;
      CategoryService.Delete(id)
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
    Functions.TablePerPage(this.tableProps);
  },
};
</script>

<style lang="scss" scoped></style>
