import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  Login(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/auth/login", reqBody, config);
  },
  Logout(username) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/auth/logout/" + username, config);
  },
};
