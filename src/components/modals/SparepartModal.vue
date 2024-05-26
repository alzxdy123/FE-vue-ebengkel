<template>
  <b-modal id="sparepart-form-modal" centered hide-header-close size="md">
    <template #modal-header>
      <b-container fluid class="py-2">
        <b-row align-h="center">
          <h5 class="font-weight-bolder">
            {{ modalTitle }}
          </h5>
        </b-row>
      </b-container>
    </template>
    <b-container fluid>
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group label="name">
              <b-form-input
                v-model="formData.name"
                name="name"
                v-validate="formRules.name"
                data-vv-as="name"
                :state="validateState('name')"
              ></b-form-input>
              <b-form-invalid-feedback id="name-invalid-feedback">{{
                errors.first("name")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="stock">
              <b-form-input
                v-model="formData.stock"
                name="stock"
                type="number"
                v-validate="formRules.stock"
                data-vv-as="stock"
                :state="validateState('stock')"
              ></b-form-input>
              <b-form-invalid-feedback id="stock-invalid-feedback">{{
                errors.first("stock")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="price">
              <b-form-input
                v-model="formData.price"
                name="price"
                type="number"
                v-validate="formRules.price"
                data-vv-as="price"
                :state="validateState('price')"
              ></b-form-input>
              <b-form-invalid-feedback id="price-invalid-feedback">{{
                errors.first("price")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Category">
              <b-form-select
                style="font-size: 13px"
                v-model="formData.category_id"
                name="category_id"
                v-validate="formRules.category_id"
                data-vv-as="Category"
                :state="validateState('category_id')"
              >
                <!-- <option value="" disabled>Select category</option> -->
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  style="font-size: 13px; font-weight: 600"
                >
                  {{ category.name }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback id="category_id-invalid-feedback">
                {{ errors.first("category_id") }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
    <template #modal-footer>
      <b-container fluid>
        <b-row align-h="end">
          <b-col cols="auto">
            <button
              class="btn btn-mt btn-secondary outlined"
              @click="handleCancel()"
            >
              cancel
            </button>
          </b-col>
          <b-col cols="auto">
            <button
              class="btn btn-mt"
              @click="handleSave()"
              style="background-color: #053364; color: white"
            >
              save
            </button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script>
import SparepartService from "../../services/SparepartService";

export default {
  name: "SparepartFormModal",
  props: {
    sparepart: {
      type: Object,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
      default: () => "I",
    },
  },
  watch: {
    sparepart: function (newVal, oldVal) {
      // Reset the form when a new sparepart is passed
      this.formData = { ...newVal };
    },
  },
  computed: {
    modalTitle: function () {
      return (this.actionType === "I" ? "add" : "edit") + " " + "Sparepart";
    },
  },
  data() {
    return {
      formData: { ...this.sparepart },
      categories: [],
      formRules: {
        name: {
          required: true,
        },
        stock: {
          required: true,
          numeric: true,
          min_value: 0,
        },
        price: {
          required: true,
          numeric: true,
          min_value: 0,
        },
        category_id: {
          required: true,
        },
      },
    };
  },
  methods: {
    validateState: function (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref);
      }
      return null;
    },

    handleCancel() {
      this.$emit("cancel");
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

    handleSave: function () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        const reqBody = {
          name: this.formData.name,
          price: this.formData.price,
          stock: this.formData.stock,
          sparepart_category_id: this.formData.category_id,
        };

        SparepartService.Add(reqBody)
          .then((res) => {
            console.log("🚀 ~ SparepartService.GetAllCategory ~ res:", res);
            this.$notify({
              group: "message",
              title: "Success",
              text: res.data.message,
              type: "success",
              duration: 5000,
            });
            this.$emit("close");
            this.$emit("saved");
          })
          .catch((err) => {
            console.log("🚀 ~ SparepartService.GetAllCategory ~ err:", err);
          });
      });
    },
  },

  mounted() {
    this.fetchSparepartCategory();
  },
};
</script>
