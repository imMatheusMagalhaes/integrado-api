"use strict"
const express = require("express");
const HttpStatusCode = require("../helpers/HttpStatusCode");
const { countries } = require("../helpers/Universities");
const UniversityModel = require("../models/UniversityModel");
const UniversityService = require("../services/UniversityService");
module.exports = class UniversityController {
  constructor() {
    this.router = express.Router();
    this.universityService = new UniversityService();
  }
  getRoutes = () => {
    this._create(this.router);
    this._delete(this.router);
    this._findAll(this.router);
    this._findOne(this.router);
    this._update(this.router);
    return this.router;
  };
  _create = (router) => {
    return router.post("/", this._hasValidUniversity, async (request, response) => {
      const { body, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.create(body);
      return response.status(status).send(data);
    });
  };
  _findAll = (router) => {
    return router.get("/", this._hasValidUniversity, async (request, response) => {
      const { query: { page, country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.findAll({ country, page });
      return response.status(status).send(data);
    }
    );
  };
  _delete = (router) => {
    return router.delete("/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { id }, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.delete(id);
      return response.status(status).send(data);
    });
  };
  _findOne = (router) => {
    return router.get("/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { id }, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.findOne(id);
      return response.status(status).send(data);
    }
    );
  };
  _update = (router) => {
    return router.put("/:id", this._hasValidUniversity, async (request, response) => {
      const { body, params: { id }, query: { country } } = request;
      const service = new UniversityService(UniversityModel(country));
      const { status, data } = await service.update({ body, id });
      return response.status(status).send(data);
    });
  };
  _hasValidUniversity = (request, response, next) => {
    const { query: { country } } = request;
    const is_valid = countries.some((validUniversity) => {
      return validUniversity === country;
    });
    if (is_valid || !country) return next();
    return response.sendStatus(HttpStatusCode.BAD_REQUEST);
  };
};
