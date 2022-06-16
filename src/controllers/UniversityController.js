"use strict"
const express = require("express");
const HttpStatusCode = require("../helpers/HttpStatusCode");
const { countries } = require("../helpers/Countries");
const UniversityModel = require("../models/UniversityModel");
const UniversityService = require("../services/UniversityService");
module.exports = class UniversityController {
  constructor() { this.router = express.Router() }
  getRoutes = () => {
    this._create();
    this._delete();
    this._findAll();
    this._findOne();
    this._update();
    return this.router;
  };
  _create = () => {
    return this.router.post("/", this._hasValidUniversity, async (request, response) => {
      const { body, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.create(body);
      return response.status(status).send(data);
    });
  };
  _findAll = () => {
    return this.router.get("/", this._hasValidUniversity, async (request, response) => {
      const { query: { page, country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.findAll({ country, page });
      return response.status(status).send(data);
    }
    );
  };
  _delete = () => {
    return this.router.delete("/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { id }, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.delete(id);
      return response.status(status).send(data);
    });
  };
  _findOne = () => {
    return this.router.get("/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { id }, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.findOne(id);
      return response.status(status).send(data);
    }
    );
  };
  _update = () => {
    return this.router.put("/:id", this._hasValidUniversity, async (request, response) => {
      const { body, params: { id }, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.update({ body, id });
      return response.status(status).send(data);
    });
  };
  _hasValidUniversity = (request, response, next) => {
    const { query: { country }, method, body } = request;
    const is_valid = countries.some((validUniversity) => validUniversity === country);
    if (method !== "PUT")
      if (is_valid || !country) return next();
    if (is_valid && Object.keys(body).length !== 0) return next();
    return response.sendStatus(HttpStatusCode.BAD_REQUEST);
  };
};
