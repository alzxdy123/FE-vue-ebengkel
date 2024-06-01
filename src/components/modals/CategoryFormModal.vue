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
            <b-form-group label="Name">
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
            <button
              class="btn-modal-oke"
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
import CategoryService from "../../services/CategoryService";

export default {
  name: "FormModal",
  props: {
    category: {
      type: Object,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
      default: () => "I",
    },
    title: {
      type: String,
      required: true,
    },
  },
  watch: {
    category: function (newVal, oldVal) {
      this.formData = {
        name: newVal.name,
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
      oldData: { ...this.category },
      formData: { ...this.category },
      formRules: {
        name: {
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

        const reqBody = {
          id: isUpdate ? this.oldData.id : undefined,
          name: this.formData.name,
        };
        console.log("🚀 ~ this.$validator.validateAll ~ reqBody:", reqBody);

        if (isUpdate) {
          CategoryService.Update(reqBody)
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
          CategoryService.Add(reqBody)
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
