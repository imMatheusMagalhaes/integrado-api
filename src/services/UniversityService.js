"use strict"
const HttpStatusCode = require("../helpers/HttpStatusCode");
const { countries } = require("../helpers/Universities");
const { universityProperties, requireUpdateProperties } = require("../helpers/UniversityProperties");
const UniversityModel = require("../models/UniversityModel");
const UniversityRepository = require("../repositories/UniversityRepository");

module.exports = class UniversityService {
  constructor(model) { this.universityRepository = new UniversityRepository(model) }
  create = async (body) => {
    if (this._hasRequiredProperty({ body, method: this.create.name })) {
      try {
        const data = await this.universityRepository.create({ target_object: body });
        return { status: HttpStatusCode.OK, data };
      } catch (error) {
        return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
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
      return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
    }
  };
  findAll = async ({ country, page = 1 }) => {
    if (country) {
      try {
        const data = await this.universityRepository.find({ target_object: {}, options: { skip: (page - 1) * 20, limit: 20 } });
        return { status: HttpStatusCode.OK, data };
      } catch (error) {
        return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
      }
    } else {
      return this._findAllUniversitiesOfDb()
    }
  };
  findOne = async (id) => {
    try {
      const data = await this.universityRepository.find({ target_object: { _id: id } });
      if (data.length > 1) return { status: HttpStatusCode.CONFLICT, data: { message: "duplicate document" } }
      return { status: HttpStatusCode.OK, data };
    } catch (error) {
      return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
    }
  };
  update = async ({ body, id }) => {
    if (this._hasRequiredProperty({ body, method: this.update.name })) {
      try {
        const data = await this.universityRepository.update({ target_object: id, desired_object: body });
        return { status: HttpStatusCode.OK, data };
      } catch (error) {
        return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
      }
    } else {
      return { status: HttpStatusCode.BAD_REQUEST, data: { message: "property required no provided" } };
    }
  };

  _findAllUniversitiesOfDb = async () => {
    try {
      let all_universities = []
      await Promise.all(
        countries.map(async (country) => {
          const universityRepository = new UniversityRepository(UniversityModel(country));
          const universities = await universityRepository.find({ target_object: {}, options: {} })
          all_universities = [...all_universities, universities]
        })
      );
      return { status: HttpStatusCode.OK, data: all_universities };
    } catch (error) {
      return { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
    }
  }
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