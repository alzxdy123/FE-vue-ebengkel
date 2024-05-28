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
          <b-form-input v-model="username"></b-form-input>
          <b-form-invalid-feedback></b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <label>Password</label>
          <b-form-input type="password" v-model="password"></b-form-input>
          <b-form-invalid-feedback></b-form-invalid-feedback>
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
            <span>Log in</span>
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
      username: "bengkel",
      password: "admin",
      chapchaError: "",
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
      if (this.chapcha === this.chapchaInput) {
        const reqBody = {
          username: this.username,
          password: this.password,
        };
        console.log("🚀 ~ HandleLogin ~ reqBody:", reqBody);

        AuthService.Login(reqBody).then((res) => {
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
        });
      } else {
        this.chapchaError = "Chapcha is wrong";
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
    this.chapchaInput = chapcha;
    this.LoginButton();
    Functions.SaveSessionCustom("token", null);
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/login.scss";
</style>
