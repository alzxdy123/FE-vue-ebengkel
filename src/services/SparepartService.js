import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/sparepart", config);
  },
  Add(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/sparepart", reqBody, config);
  },

  //Spacepart Category

  GetAllCategory() {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/sparepart-category", config);
  },
};
