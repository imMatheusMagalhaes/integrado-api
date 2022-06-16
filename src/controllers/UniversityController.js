const express = require("express");
const HttpStatusCode = require("../helpers/HttpStatusCode");
const { universities } = require("../helpers/Universities");
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
    return router.post("/:university", this._hasValidUniversity, async (request, response) => {
      const { body, params: { university } } = request;
      const service = new UniversityService(UniversityModel(university));
      const { status, data } = await service.create(body);
      return response.status(status).send(data);
    });
  };
  _findAll = (router) => {
    return router.get("/:university", this._hasValidUniversity, async (request, response) => {
      const { params: { university } } = request;
      const service = new UniversityService(UniversityModel(university));
      const { status, data } = await service.findAll();
      return response.status(status).send(data);
    }
    );
  };
  _delete = (router) => {
    return router.delete("/:university/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { university, id } } = request;
      const service = new UniversityService(UniversityModel(university));
      const { status, data } = await service.delete(id);
      return response.status(status).send(data);
    });
  };
  _findOne = (router) => {
    return router.get("/:university/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { university, id } } = request;
      const service = new UniversityService(UniversityModel(university));
      const { status, data } = await service.findOne(id);
      return response.status(status).send(data);
    }
    );
  };
  _update = (router) => {
    return router.put("/:university/:id", this._hasValidUniversity, async (request, response) => {
      const { body, params: { university, id } } = request;
      const service = new UniversityService(UniversityModel(university));
      const { status, data } = await service.update({ body, id });
      return response.status(status).send(data);
    });
  };
  _hasValidUniversity = (request, response, next) => {
    const { params: { university } } = request;
    const is_valid = universities.some((validUniversity) => {
      return validUniversity === university;
    });
    if (is_valid) return next();
    return response.sendStatus(HttpStatusCode.BAD_REQUEST);
  };
};
