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
          <div
            class="menu-header"
            :class="{ active: $route.path === '/dashboard' }"
          >
            Dashboard
          </div>
          <div class="menu-header">Log out</div>
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
import Functions from "../../tools/Functions";

export default {
  data() {
    return {
      router: this.$router,
    };
  },
  methods: {
    NavHeader() {
      Functions.NavHeader();
    },
  },

  mounted() {
    this.NavHeader();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/home.scss";
</style>
