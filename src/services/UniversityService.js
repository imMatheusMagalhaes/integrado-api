"use strict"
module.exports = class UniversityService {
  constructor(model) {
    this.model = model
    this.universityRepository = require("../repositories/UniversityRepository");
    this.universityModel = require("../models/UniversityModel")
    this.httpStatusCode = require("../helpers/HttpStatusCode")
    this.countries = require("../helpers/Countries");
    this.properties = require("../helpers/UniversityProperties");
    this.universityProperties = this.properties.universityProperties
    this.requireUpdateProperties = this.properties.requireUpdateProperties
    this.repository = new this.universityRepository.UniversityRepository(this.model)
  }
  create = async (body) => {
    if (this._hasRequiredProperty({ body, method: this.create.name })) {
      try {
        const data = await this.repository.create({ target_object: body });
        return { status: this.httpStatusCode.OK, data };
      } catch (error) {
        return { status: this.httpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
      }
    } else {
      return { status: this.httpStatusCode.BAD_REQUEST, data: { message: "property required no provided" } };
    }
  };
  delete = async (id) => {
    try {
      const data = await this.repository.delete({ target_object: { _id: id } });
      return { status: this.httpStatusCode.OK, data };
    } catch (error) {
      return { status: this.httpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
    }
  };
  findAll = async ({ country, page = 1 }) => {
    if (country) {
      try {
        const data = await this.repository.find({ target_object: {}, options: { skip: (page - 1) * 20, limit: 20 } });
        return { status: this.httpStatusCode.OK, data };
      } catch (error) {
        return { status: this.httpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
      }
    } else {
      return this._findAllUniversitiesOfDb()
    }
  };
  findOne = async (id) => {
    try {
      const data = await this.repository.find({ target_object: { _id: id } });
      if (data.length > 1) return { status: this.httpStatusCode.CONFLICT, data: { message: "duplicate document" } }
      return { status: this.httpStatusCode.OK, data };
    } catch (error) {
      return { status: this.httpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
    }
  };
  update = async ({ body, id }) => {
    if (this._hasRequiredProperty({ body, method: this.update.name })) {
      try {
        const data = await this.repository.update({ target_object: id, desired_object: body });
        return { status: this.httpStatusCode.OK, data };
      } catch (error) {
        return { status: this.httpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
      }
    } else {
      return { status: this.httpStatusCode.BAD_REQUEST, data: { message: "properties not valids" } };
    }
  };

  _findAllUniversitiesOfDb = async () => {
    try {
      let all_universities = []
      await Promise.all(
        this.countries.map(async (country) => {

          const universityRepository = new this.universityRepository.UniversityRepository(this.universityModel(country));
          const universities = await universityRepository.find({ target_object: {}, options: {} })
          all_universities = [...all_universities, universities]
        })
      );
      return { status: this.httpStatusCode.OK, data: all_universities };
    } catch (error) {
      return { status: this.httpStatusCode.INTERNAL_SERVER_ERROR, data: { message: error.toString() } };
    }
  }
  _hasRequiredProperty = ({ body, method }) => {
    if (method === "create") {
      body["state-province"]
      return this.universityProperties.every((property) => body.hasOwnProperty(property));
    } else if (method === "update") {
      return Object.keys(body).every((property) => this.requireUpdateProperties.includes(property));
    } else {
      throw new Error("method not provided")
    }
  };
};