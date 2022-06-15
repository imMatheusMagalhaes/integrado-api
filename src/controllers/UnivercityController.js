const express = require("express");
const UnivercityService = require("../services/UnivercityService");
module.exports = class UnivercityController {
  constructor() {
    this.router = express.Router();
    this.univercityService = new UnivercityService();
  }

  getRoutes = () => {
    this._findAll(this.router);
    return this.router;
  };

  _findAll = (router) => {
    router.get("/", async (_, response) => {
      const { status, data } = await this.univercityService.findAll();
      return response.status(status).send(data);
    });
  };
};
