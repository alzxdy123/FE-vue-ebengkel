import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/order", config);
  },
  GetByID(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/order/" + id, config);
  },
  Add(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/order", reqBody, config);
  },
  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/order/" + id, config);
  },

  // Update(reqBody) {
  //   let config = {};
  //   config = header.authHeader();
  //   return AXIOS.put("/v1/order/" + reqBody.id, reqBody, config);
  // },
};
