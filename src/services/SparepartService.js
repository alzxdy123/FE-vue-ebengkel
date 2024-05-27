import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll(params) {
    const config = {
      ...header.authHeader(),
      params: params,
    };
    return AXIOS.get("/v1/sparepart", config);
  },
  GetByID(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/sparepart/" + id, config);
  },
  Add(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v2/sparepart", reqBody, config);
  },
  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/sparepart/" + id, config);
  },

  //Spacepart Category

  GetAllCategory() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/sparepart-category", config);
  },
};
