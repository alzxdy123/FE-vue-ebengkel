<template>
  <div class="login">
    <div class="box">
      <div class="header">Login</div>
      <form class="body">
        <b-form-group>
          <label for="">Username</label>
          <b-form-input></b-form-input>
          <b-form-invalid-feedback></b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <label for="">Password</label>
          <b-form-input></b-form-input>
          <b-form-invalid-feedback></b-form-invalid-feedback>
        </b-form-group>
        <div class="chapcha">
          <div class="chapcha-box">
            <span>chapcha</span>
            <i class="jam jam-refresh"></i>
          </div>
          <div class="chapcha-input">
            <b-form-group>
              <b-form-input></b-form-input>
              <b-form-invalid-feedback></b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <div class="footer">
          <b-button
            type="button"
            class="btn-login"
            :variant="loginButtonVariant"
          >
            <span>Log in</span>
          </b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../assets/scss/login.scss";
</style>
