import { AXIOS } from "./common/server";
import header from "./common/header";

export default {
  GetAll(params) {
    const config = {
      ...header.authHeader(),
      params: params,
    };
    return AXIOS.get("/v1/sparepart-category", config);
  },
  GetByID(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.get("/v1/sparepart-category/" + id, config);
  },
  Add(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.post("/v1/sparepart-category", reqBody, config);
  },
  Delete(id) {
    let config = {};
    config = header.authHeader();
    return AXIOS.delete("/v1/sparepart-category/" + id, config);
  },

  Update(reqBody) {
    let config = {};
    config = header.authHeader();
    return AXIOS.put("/v1/sparepart-category/" + reqBody.id, reqBody, config);
  },

  //Spacepart Category
};
