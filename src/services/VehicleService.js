import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll(params) {
    const config = {
      ...header.authHeader(),
      params: params,
    };
    return AXIOS.get("/v1/vehicle", config);
  },
  GetByID(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/vehicle/" + id, config);
  },
  Add(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/vehicle", reqBody, config);
  },
  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/vehicle/" + id, config);
  },

  Update(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.put("/v1/vehicle/" + reqBody.id, reqBody, config);
  },

  Author() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/author/vehicle", config);
  },
};
