"use strict"
class UniversityController {
  constructor() {
    this.express = require("express")
    this.countries = require("../helpers/Countries")
    this.httpStatusCode = require("../helpers/HttpStatusCode")
    this.universityModel = require("../models/UniversityModel")
    this.universityService = require("../services/UniversityService")
    this.router = this.express.Router()
  }
  getRoutes = () => {
    this._create()
    this._delete()
    this._findAll()
    this._findOne()
    this._update()
    return this.router
  }
  _create = () => {
    return this.router.post("/", this._hasValidUniversity, async (request, response) => {
      const { body, query: { country } } = request
      const service = new this.universityService(this.universityModel(country))
      const { status, data } = await service.create(body)
      return response.status(status).send(data)
    })
  }
  _findAll = () => {
    return this.router.get("/", this._hasValidUniversity, async (request, response) => {
      const { query: { page, country } } = request
      const service = new this.universityService(this.universityModel(country))
      const { status, data } = await service.findAll({ country, page })
      return response.status(status).send(data)
    }
    )
  }
  _delete = () => {
    return this.router.delete("/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { id }, query: { country } } = request
      const service = new this.universityService(this.universityModel(country))
      const { status, data } = await service.delete(id)
      return response.status(status).send(data)
    })
  }
  _findOne = () => {
    return this.router.get("/:id", this._hasValidUniversity, async (request, response) => {
      const { params: { id }, query: { country } } = request
      const service = new this.universityService(this.universityModel(country))
      const { status, data } = await service.findOne(id)
      return response.status(status).send(data)
    }
    )
  }
  _update = () => {
    return this.router.put("/:id", this._hasValidUniversity, async (request, response) => {
      const { body, params: { id }, query: { country } } = request
      const service = new this.universityService(this.universityModel(country))
      const { status, data } = await service.update({ body, id })
      return response.status(status).send(data)
    })
  }
  _hasValidUniversity = (request, response, next) => {
    const { query: { country }, method, body } = request
    const is_valid = this.countries.some((validUniversity) => validUniversity === country)
    if (method !== "PUT")
      if (is_valid || !country) return next()
    if (is_valid && Object.keys(body).length !== 0) return next()
    return response.sendStatus(this.httpStatusCode.BAD_REQUEST)
  }
}
module.exports = { UniversityController }