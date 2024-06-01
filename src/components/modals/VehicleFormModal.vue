<template>
  <b-modal id="form-modal" centered hide-header-close size="md">
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
      <b-form @submit.prevent="handleSave()">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Police Number">
              <b-form-input
                v-model="formData.police_number"
                name="police-number"
                v-validate="formRules.police_number"
                data-vv-as="police-number"
                :state="validateState('police-number')"
              ></b-form-input>
              <b-form-invalid-feedback id="police-number-invalid-feedback">{{
                errors.first("police-number")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Type">
              <b-form-input
                v-model="formData.type"
                name="type"
                v-validate="formRules.type"
                data-vv-as="type"
                :state="validateState('type')"
              ></b-form-input>
              <b-form-invalid-feedback id="type-invalid-feedback">{{
                errors.first("type")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Merk">
              <b-form-input
                v-model="formData.merk"
                name="merk"
                v-validate="formRules.merk"
                data-vv-as="merk"
                :state="validateState('merk')"
              ></b-form-input>
              <b-form-invalid-feedback id="merk-invalid-feedback">{{
                errors.first("merk")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Years">
              <b-form-input
                v-model="formData.years"
                name="years"
                type="number"
                v-validate="formRules.years"
                data-vv-as="years"
                :state="validateState('years')"
              ></b-form-input>
              <b-form-invalid-feedback id="years-invalid-feedback">{{
                errors.first("years")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Author">
              <b-form-select
                style="font-size: 13px"
                v-model="formData.user_id"
                name="user_id"
                v-validate="formRules.user_id"
                data-vv-as="user_id"
                :state="validateState('user_id')"
              >
                <option
                  v-for="author in authors"
                  :key="author.id"
                  :value="author.id"
                  style="font-size: 13px; font-weight: 600"
                >
                  {{ author.username }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback id="user_id-invalid-feedback">
                {{ errors.first("user_id") }}
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
            <button class="btn-modal-cancel" @click="handleCancel()">
              cancel
            </button>
          </b-col>
          <b-col cols="auto">
            <button class="btn-modal-oke" @click="handleSave()">save</button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script>
import VehicleService from "../../services/VehicleService";

export default {
  name: "FormModal",
  props: {
    vehicle: {
      type: Object,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
      default: () => "I",
    },
    authors: {
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  watch: {
    vehicle: function (newVal, oldVal) {
      this.formData = {
        police_number: newVal.police_number,
        type: newVal.type,
        merk: newVal.merk,
        years: newVal.years,
        user_id: newVal.user_id,
      };
      this.oldData = { ...newVal };
    },
  },

  computed: {
    modalTitle: function () {
      return (this.actionType === "I" ? "Add" : "Edit") + " " + this.title;
    },
  },
  data() {
    return {
      oldData: { ...this.vehicle },
      formData: { ...this.vehicle },
      formRules: {
        police_number: {
          required: true,
        },
        type: {
          required: true,
        },
        merk: {
          required: true,
        },
        years: {
          required: true,
        },
        user_id: {
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

    handleSave: function () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        const isUpdate = this.$props.actionType == "U";

        const oldData = isUpdate
          ? {
              police_number: this.oldData.police_number,
              type: this.oldData.type,
              merk: this.oldData.merk,
              years: this.oldData.years,
              user_id: this.oldData.user_id,
            }
          : undefined;

        const newData = {
          police_number: this.formData.police_number,
          type: this.formData.type,
          merk: this.formData.merk,
          years: this.formData.years,
          user_id: this.formData.user_id,
        };

        const reqBody = {
          id: isUpdate ? this.oldData.id : undefined,
          oldData: isUpdate ? JSON.stringify(oldData) : undefined,
          newData: newData,
        };

        if (isUpdate) {
          VehicleService.Update(reqBody)
            .then((res) => {
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
              this.$notify({
                group: "message",
                title: "Error",
                text: err.response.data.message,
                type: "error",
                duration: 5000,
              });
            });
        } else {
          VehicleService.Add(reqBody)
            .then((res) => {
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
              this.$notify({
                group: "message",
                title: "Error",
                text: err.response.data.message,
                type: "error",
                duration: 5000,
              });
            });
        }
      });
    },
  },
};
</script>
