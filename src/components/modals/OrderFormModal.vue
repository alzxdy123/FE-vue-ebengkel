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
            <b-form-group label="Customer">
              <b-form-select
                style="font-size: 13px"
                v-model="formData.user"
                name="user"
                v-validate="formRules.user"
                data-vv-as="user"
                :state="validateState('user')"
              >
                <option
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                  style="font-size: 13px; font-weight: 600"
                >
                  {{ user.username }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback id="user-invalid-feedback">
                {{ errors.first("user") }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-row>
          <b-col cols="12">
            <b-form-group label="Vehicle">
              <b-form-select
                v-model="formData.vehicle"
                name="vehicle"
                v-validate="formRules.vehicle"
                data-vv-as="vehicle"
                :state="validateState('vehicle')"
                class="large-font"
              >
                <option
                  v-for="vehi in vehicles"
                  :key="vehi.id"
                  :value="vehi.id"
                  class="large-font"
                >
                  {{ vehi.merk }} - {{ vehi.police_number }}
                </option>
              </b-form-select>
              <b-form-invalid-feedback id="vehicle-invalid-feedback">{{
                errors.first("vehicle")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row> -->
        <div v-for="(detail, index) in formData.details" :key="index">
          <b-row>
            <b-col cols="8">
              <b-form-group label="Sparepart">
                <b-form-select
                  v-model="detail.sparepart_id"
                  name="sparepart"
                  v-validate="formRules.details.sparepart"
                  data-vv-as="sparepart"
                  :state="validateState('sparepart')"
                  class="large-font"
                >
                  <option value="0"></option>
                  <option
                    v-for="spare in sparepart"
                    :key="spare.id"
                    :value="spare.id"
                    class="large-font"
                  >
                    {{ spare.name }} - {{ spare.category.name }}
                  </option>
                </b-form-select>
                <b-form-invalid-feedback id="sparepart-invalid-feedback">{{
                  errors.first("sparepart")
                }}</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Amount">
                <b-form-input
                  type="number"
                  v-model="detail.quantity"
                  name="quantity"
                  v-validate="formRules.details.quantity"
                  data-vv-as="quantity"
                  :state="validateState('quantity')"
                ></b-form-input>
                <b-form-invalid-feedback id="quantity-invalid-feedback">{{
                  errors.first("quantity")
                }}</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="1" class="d-flex align-items-center">
              <b-button variant="secondary" @click="removeDetail(index)"
                >X</b-button
              >
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col cols="12" class="text-left">
            <b-button variant="secondary" @click="addDetail"
              ><i class="jam jam-plus mr-1"></i>Add Request</b-button
            >
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
import OrderService from "../../services/OrderService";
import SparepartService from "../../services/SparepartService";
import VehicleService from "../../services/VehicleService";
import moment from "moment";

export default {
  name: "FormModal",
  props: {
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
  computed: {
    modalTitle: function () {
      return (this.actionType === "I" ? "Add" : "edit") + " " + this.title;
    },
  },
  data() {
    return {
      formData: {
        user: "",
        vehicle: "",
        details: [
          {
            sparepart_id: undefined,
            quantity: undefined,
          },
        ],
      },
      users: [],
      vehicles: [],
      sparepart: [],
      formRules: {
        user: {
          required: true,
        },
        vehicle: {
          required: true,
        },
        details: {
          required: true,
          sparepart: {
            required: true,
          },
          quantity: {
            required: true,
          },
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

        const formattedDate = moment().format("YYYY-MM-DD");
        const reqBody = {
          user_id: 3,
          order_date: formattedDate,
          vehicle_id: this.formData.vehicle,
          details: this.formData.details,
        };
        // console.log("🚀 ~ this.$validator.validateAll ~ reqBody:", reqBody);

        OrderService.Add(reqBody)
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
      });
    },

    // FetchVehicle() {
    //   VehicleService.GetAll()
    //     .then((res) => {
    //       this.vehicles = res.data.data;
    //     })
    //     .catch((err) => {
    //       this.$notify({
    //         group: "message",
    //         title: "Error",
    //         text: err.response.data.message,
    //         type: "error",
    //         duration: 5000,
    //       });
    //     });
    // },
    FetchSparepart() {
      SparepartService.GetAll()
        .then((res) => {
          this.sparepart = res.data.data;
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
    },
    addDetail() {
      this.formData.details.push({ sparepart: "", quantity: "" });
    },
    removeDetail(index) {
      this.formData.details.splice(index, 1);
    },

    FetchUser() {
      VehicleService.Author()
        .then((res) => {
          this.users = res.data.data;
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
    },
  },

  mounted() {
    this.FetchSparepart();
    // this.FetchVehicle();
    this.FetchUser();
  },
};
</script>

<style scoped>
.large-font {
  font-size: 13px;
}
</style>
