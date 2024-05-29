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
    // // window.console.log(read);
    if (read == "null") {
      return null;
    } else {
      let dencrypt = Crypto.dencrytion(read);
      if (dencrypt == "" || dencrypt == undefined) {
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

  ButtonLoginVariant() {
    $(document).ready(function () {
      function checkInputs() {
        var allFilled = true;
        $("input").each(function () {
          if ($(this).val() === "") {
            allFilled = false;
            return false;
          }
        });

        if (allFilled) {
          $(".btn-login").css("background-color", "#053364");
          $(".btn-login").prop("disabled", false);
        } else {
          $(".btn-login").css("background-color", "");
          $(".btn-login").prop("disabled", true);
        }
      }

      checkInputs();
      $("input").on("input", function () {
        checkInputs();
      });
    });
  },

  LoginResponsive() {
    $(document).ready(() => {
      function scaleElements() {
        const windowWidth = $(window).width();
        let scaleFactor = 1;

        if (windowWidth > 1700) {
          scaleFactor = 1.3;
          $(".logo").css("left", "100px");
        } else if (windowWidth < 500) {
          scaleFactor = 0.8;
          $(".logo").css("left", "0");
        } else {
          scaleFactor = 1;
          $(".logo").css("left", "100px");
        }

        $(".box, .logo").css("transform", `scale(${scaleFactor})`);
      }

      scaleElements();
      $(window).resize(() => {
        scaleElements();
      });
    });
  },

  TablePerPage(tableProps) {
    $(document).ready(() => {
      function UpdatePerPageValue() {
        let windowWidth = $(window).width();
        let perPage = windowWidth > 1700 ? 10 : 5;
        tableProps.perpage = perPage;
      }

      UpdatePerPageValue();
      $(window).resize(() => {
        UpdatePerPageValue();
      });
    });
  },
};
