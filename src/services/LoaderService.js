"use strict"
class LoaderService {
  constructor() {
    this.axios = require("axios")
    this.mongoose = require("mongoose")
    this.countries = require("../helpers/Countries")
    this.universityModel = require("../models/UniversityModel")
    this.universityRepository = require("../repositories/UniversityRepository")
  }
  runLoaders = async () => {
    if (!await this._dbIsPopulated()) {
      await this._initialDbPopulation()
      console.info("[INFO] - populate db")
    }
  }
  _initialDbPopulation = async () => {
    return await Promise.all(
      this.countries.map(async (country) => {
        const data = await this._getUniversityData(country)
        await this._saveUniversityData({ data, country })
      })
    )
  }
  _saveUniversityData = async (params) => {
    const { data, country } = params
    try {
      const universityRepository = new this.universityRepository.UniversityRepository(this.universityModel(country))
      return await universityRepository.create({ target_object: data })
    } catch (error) {
      console.error(error.toString())
      throw error
    }
  }
  _getUniversityData = async (country) => {
    try {
      const { data } = await this.axios.get(`http://universities.hipolabs.com/search?country=${country}`)
      return data
    } catch (error) {
      console.error(error.toString())
      throw error
    }
  }
  _dbIsPopulated = async () => {
    console.info("[INFO] - checking if the database is populated...")
    const collections = await this.mongoose.connection.db.listCollections().toArray().then((response) => response)
    return collections.length !== 0
  }
}

module.exports = { LoaderService }
