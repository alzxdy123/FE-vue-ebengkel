<template>
  <b-modal
    id="sparepart-form-modal"
    centered
    hide-header-close
    size="lg"
    @hidden="handleCancel"
  >
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
            <b-form-group :label="$t('label.name')">
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
            <b-form-group :label="$t('label.stock')">
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
            <b-form-group :label="$t('label.price')">
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
      </b-form>
    </b-container>
    <template #modal-footer>
      <b-container fluid>
        <b-row align-h="between">
          <b-col cols="auto">
            <button class="btn-mt secondary outlined" @click="handleCancel()">
              {{ $t("action.cancel") }}
            </button>
          </b-col>
          <b-col cols="auto">
            <button class="btn-mt secondary" @click="handleSave()">
              {{ $t("action.save") }}
            </button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script>
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
      return (
        this.$t(`pages.${this.actionType === "I" ? "add" : "edit"}`) +
        " " +
        this.$t(`pages.sparepart`)
      );
    },
  },
  data() {
    return {
      formData: { ...this.sparepart },
      formRules: {
        name: {
          required: true,
        },
        stock: {
          required: true,
          numeric: true,
          min_value: 0, // Adjust as per your requirement
        },
        price: {
          required: true,
          numeric: true,
          min_value: 0, // Adjust as per your requirement
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

    handleSave: function () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        // Perform save operation here
        // You can access form data using this.formData
      });
    },
  },
};
</script>
