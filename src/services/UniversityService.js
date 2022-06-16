const HttpStatusCode = require("../helpers/HttpStatusCode");
const { universityProperties, requireUpdateProperties } = require("../helpers/UniversityProperties");
const UniversityRepository = require("../repositories/UniversityRepository");

module.exports = class UniversityService {
  constructor(model) { this.universityRepository = new UniversityRepository(model) }
  create = async (body) => {
    if (this._hasRequiredProperty({ body, method: this.create.name })) {
      try {
        const data = await this.universityRepository.create({ target_object: body });
        return { status: HttpStatusCode.OK, data };
      } catch (error) {
        return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: error };
      }
    } else {
      return { status: HttpStatusCode.BAD_REQUEST, data: { message: "property required no provided" } };
    }
  };
  delete = async (id) => {
    try {
      const data = await this.universityRepository.delete({ target_object: { _id: id } });
      return { status: HttpStatusCode.OK, data };
    } catch (error) {
      return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: error };
    }
  };
  findAll = async () => {
    try {
      const data = await this.universityRepository.find({ target_object: {} });
      return { status: HttpStatusCode.OK, data };
    } catch (error) {
      return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: error };
    }
  };
  findOne = async (id) => {
    try {
      const data = await this.universityRepository.find({ target_object: { _id: id } });
      if (data.length > 1) return { status: HttpStatusCode.CONFLICT, data: { message: "duplicate document" } }
      return { status: HttpStatusCode.OK, data };
    } catch (error) {
      return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: error };
    }
  };
  update = async ({ body, id }) => {
    if (this._hasRequiredProperty({ body, method: this.update.name })) {
      try {
        const data = await this.universityRepository.update({ target_object: id, desired_object: body });
        return { status: HttpStatusCode.OK, data };
      } catch (error) {
        return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: error };
      }
    } else {
      return { status: HttpStatusCode.BAD_REQUEST, data: { message: "property required no provided" } };
    }
  };
  _hasRequiredProperty = ({ body, method }) => {
    if (method === "create") {
      return universityProperties.every((property) => {
        return body.hasOwnProperty(property);
      });
    } else if (method === "update") {
      return requireUpdateProperties.every((property) => {
        return body.hasOwnProperty(property);
      });
    } else {
      throw new Error("method not provided")
    }
  };
};