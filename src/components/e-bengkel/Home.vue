<template>
  <div class="home">
    <div class="header-group">
      <div class="header">
        <div class="logo">
          <div class="role">Role</div>
          <p>E-bengkel</p>
        </div>
        <div class="header-navigation">
          <div class="menu-header">Language</div>
          <router-link
            class="menu-header"
            style="text-decoration: none !important"
            :class="{ active: $route.path === '/dashboard' }"
            to="/dashboard"
          >
            Dashboard
          </router-link>
          <div class="menu-header" @click="HandleLogout()">Log out</div>
          <div class="menu-header">User</div>
        </div>
      </div>

      <div class="nav-header">
        <div class="list">
          <router-link
            to="/sparepart"
            class="nav-menu-header"
            :class="{ active: $route.path === '/sparepart' }"
          >
            <p>Sparepart</p>
            <i class="jam jam-chevron-down"></i>
          </router-link>
          <router-link
            to="/category"
            class="nav-menu-header"
            :class="{ active: $route.path === '/category' }"
          >
            <p>Category</p>
            <i class="jam jam-chevron-down"></i>
          </router-link>
          <router-link
            to="/vehicle"
            class="nav-menu-header"
            :class="{ active: $route.path === '/vehicle' }"
          >
            <p>Vehicle</p>
            <i class="jam jam-chevron-down"></i>
          </router-link>
          <router-link
            to="/order"
            class="nav-menu-header"
            :class="{ active: $route.path === '/order' }"
          >
            <p>Order</p>
            <i class="jam jam-chevron-down"></i>
          </router-link>
        </div>

        <!-- <div class="nav-sub-header">
          <div class="contents">
            <div class="row">
              <div class="col-md-4">
                <div class="box-sub-menu">
                  <div class="title-sub-menu">title</div>
                  <div class="sub-header">
                    <ul>
                      <router-link to="/" tag="li" active-class="active"
                        >link</router-link
                      >
                      <router-link to="/" tag="li" active-class="active"
                        >link</router-link
                      >
                      <router-link to="/" tag="li" active-class="active"
                        >link</router-link
                      >
                      <router-link to="/" tag="li" active-class="active"
                        >link</router-link
                      >
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="message-global">
      <notifications group="message" />
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import AuthService from "../../services/AuthService";
import Functions from "../../tools/Functions";

export default {
  data() {
    return {
      router: this.$router,
      username: "",
    };
  },
  methods: {
    NavHeader() {
      Functions.NavHeader();
    },

    HandleLogout() {
      AuthService.Logout(this.username)
        .then((res) => {
          this.$notify({
            group: "login",
            title: "Success",
            text: res.data.message,
            type: "success",
            duration: 5000,
          });
          localStorage.clear();

          Functions.ToPage("login");
        })
        .catch((err) => {
          this.$notify({
            group: "login",
            title: "Success",
            text: err.response.data.message,
            type: "success",
            duration: 5000,
          });
        });
    },
  },

  mounted() {
    this.NavHeader();
    this.username = Functions.ReadSessionCustom("username");
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/home.scss";
</style>
