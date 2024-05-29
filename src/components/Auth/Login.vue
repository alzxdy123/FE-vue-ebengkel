<template>
  <div class="login">
    <div class="logo">
      <div class="author">aldy balya diprana</div>
      <span>e - bengkel</span>
    </div>
    <div class="box">
      <div class="header">Login</div>
      <form class="body">
        <b-form-group>
          <label>Username</label>
          <b-form-input
            v-model="username"
            id="username-input"
            name="username-input"
            v-validate="{ required: true }"
            :state="validateState('username-input')"
            aria-describedby="username-input-feedback"
            data-vv-as="username"
          ></b-form-input>
          <b-form-invalid-feedback id="username-input-feedback">{{
            errors.first("username-input")
          }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <label>Password</label>
          <b-form-input
            type="password"
            v-model="password"
            id="password-input"
            name="password-input"
            v-validate="{ required: true }"
            :state="validateState('password-input')"
            aria-describedby="password-input-feedback"
            data-vv-as="password"
          ></b-form-input>
          <b-form-invalid-feedback id="password-input-feedback">{{
            errors.first("password-input")
          }}</b-form-invalid-feedback>
        </b-form-group>
        <div class="chapcha">
          <div class="chapcha-box">
            <span>{{ chapcha }}</span>
            <i class="jam jam-refresh" @click="ReGenerateChaptcha()"></i>
          </div>
          <div class="chapcha-input">
            <b-form-group>
              <b-form-input
                v-model="chapchaInput"
                id="chapcha-input"
                name="chapcha-input"
                v-validate="{ required: true }"
                :state="validateState('chapcha-input')"
                aria-describedby="chapcha-input-feedback"
                data-vv-as="chapcha"
              ></b-form-input>
              <b-form-invalid-feedback id="chapcha-input-feedback">{{
                errors.first("chapcha-input")
              }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <div class="footer">
          <b-button type="button" class="btn-login" @click="HandleLogin()">
            <b-spinner v-if="isBusy" class="align-items-center"></b-spinner>
            <span v-else>Log in</span>
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { ValidationObserver, ValidationProvider } from "vee-validate";
import Functions from "../../tools/Functions";
import AuthService from "../../services/AuthService";

export default {
  data() {
    return {
      chapcha: "",
      chapchaInput: "",
      username: "",
      password: "",
      chapchaError: "",
      errorMessage: "",
      isBusy: false,
    };
  },

  watch: {
    chapchaError(newValue) {
      if (newValue) {
        this.$validator.errors.add({
          field: "chapcha-input",
          msg: newValue,
        });
      } else {
        this.$validator.errors.remove("chapcha-input");
      }
    },
    errorMessage(newValue) {
      const validator = this.$validator;

      if (newValue) {
        ["password-input", "username-input"].forEach((field) => {
          validator.errors.add({
            field: field,
            msg: newValue,
          });
        });
      } else {
        ["password-input", "username-input"].forEach((field) => {
          validator.errors.remove(field);
        });
      }
    },
  },

  methods: {
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref);
      }
      return null;
    },

    HandleLogin() {
      this.isBusy = true;
      if (this.chapcha === this.chapchaInput) {
        const reqBody = {
          username: this.username,
          password: this.password,
        };
        console.log("🚀 ~ HandleLogin ~ reqBody:", reqBody);

        AuthService.Login(reqBody)
          .then((res) => {
            this.isBusy = false;
            const data = res.data.data;

            Functions.SaveSessionCustom("token", data.token);
            Functions.SaveSessionCustom("username", data.username);

            this.$notify({
              group: "login",
              title: "Success",
              text: res.data.message,
              type: "success",
              duration: 5000,
            });
            Functions.ToPage("dashboard");
          })
          .catch((err) => {
            this.isBusy = false;
            this.$notify({
              group: "login",
              title: "Error",
              text: err.response.data.message,
              type: "error",
              duration: 5000,
            });
            this.errorMessage = err.response.data.message;
          });
      } else {
        this.chapchaError = "Chapcha is wrong";
        this.isBusy = false;
      }
    },

    ReGenerateChaptcha() {
      const chapcha = Functions.GenerateChaptcha(4);
      this.chapcha = chapcha;
    },

    LoginButton() {
      return Functions.ButtonLoginVariant();
    },
  },

  mounted() {
    const chapcha = Functions.GenerateChaptcha(4);
    this.chapcha = chapcha;
    this.LoginButton();
    Functions.LoginResponsive();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/login.scss";
</style>
