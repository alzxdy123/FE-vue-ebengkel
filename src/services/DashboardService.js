import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  Get() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/dashboard", config);
  },
};
