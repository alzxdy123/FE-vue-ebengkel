<template>
  <b-modal
    :id="modalId"
    @ok="handleOk"
    @close="handleClose"
    @cancel="handleCancel"
    @hidden="handleCancel"
    centered
    size="sm"
    body-class="text-center"
    hide-header-close
  >
    <template #modal-header>
      <b-container fluid class="py-1">
        <b-row align-h="center">
          <i class="jam jam-alert-f text-danger" style="font-size: 40px" />
        </b-row>
      </b-container>
    </template>
    <div class="delete-modal__body" style="font-size: 15px; font-weight: 600">
      <p>Hapus data</p>
    </div>
    <template #modal-footer>
      <b-container fluid>
        <b-row align-h="center">
          <b-col cols="auto">
            <button
              class="btn-mt btn btn-secondary outlined"
              @click="handleCancel()"
              :disabled="loading"
            >
              Tidak
            </button>
          </b-col>
          <b-col cols="auto">
            <button
              class="btn-mt btn btn-danger"
              @click="handleOk()"
              :disabled="loading"
            >
              Ya
            </button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
export default {
  name: "DeleteModal",
  props: {
    modalId: {
      type: String,
      default: "delete-modal",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOk() {
      this.$emit("ok");
    },
    handleCancel() {
      this.$emit("cancel");
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
