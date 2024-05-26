import Crypto from "./crypto";
import router from "../router";
import $ from "jquery";

export default {
  NavHeader() {
    $(document).ready(function () {
      $(".body").mouseenter(function () {
        $(".nav-sub-header").removeClass("active");
      });
      const sub_menu = $(".nav-menu-header");
      sub_menu.bind("click", function () {
        sub_menu.removeClass("active");
        $(this).addClass("active");
        let id_attr = $(this).attr("id");
        $(".nav-sub-header").removeClass("active");
        $("#" + id_attr + ".nav-sub-header").addClass("active");
      });

      const nav_menu_sub = $(".sub-header ul li");
      nav_menu_sub.bind("click", function () {
        $(".nav-sub-header").removeClass("active");
      });
    });
  },

  ToPage(page) {
    this.SaveSessionCustom("page", page);
    return router.replace(page).catch((error) => {
      return error;
    });
  },

  GenerateChaptcha(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  SaveSessionCustom(key, value) {
    let ToJson = JSON.stringify(value);
    let encrypt = Crypto.encryption(ToJson);
    return localStorage.setItem(key, encrypt);
  },

  ReadSessionCustom(key) {
    let read = localStorage.getItem(key);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
        Vue.notify({
          group: "message",
          title: "Error ",
          text: key,
          type: "error",
          duration: 5000,
        });
        this.ToPage("/");
        // window.console.log(key);
        return null;
      } else {
        let JsonToData = JSON.parse(dencrypt);
        return JsonToData;
      }
    }
  },

  RemoveSessionCustom(key) {
    let read = localStorage.getItem(key);
    if (read == "null") {
      return false;
    } else {
      localStorage.removeItem(key);
      return true;
    }
  },
};