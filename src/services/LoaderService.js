"use strict"
const axios = require("axios");
const { default: mongoose } = require("mongoose");
const { countries } = require("../helpers/Countries");
const UniversityModel = require("../models/UniversityModel");
const UniversityRepository = require("../repositories/UniversityRepository");

module.exports = class LoaderService {
  constructor() { this.teste = 0 }
  runLoaders = async () => {
    if (!await this._dbIsPopulated()) {
      await this._initialDbPopulation()
      console.info("[INFO] - populate db")
    }
  };
  _initialDbPopulation = async () => {
    return await Promise.all(
      countries.map(async (country) => {
        const data = await this._getUniversityData(country);
        await this._saveUniversityData({ data, country });
      })
    );
  }
  _saveUniversityData = async (params) => {
    const { data, country } = params;
    try {
      const universityRepository = new UniversityRepository(UniversityModel(country));
      return await universityRepository.create({ target_object: data });
    } catch (error) {
      console.error(error.toString());
      throw error;
    }
  };
  _getUniversityData = async (university) => {
    try {
      const { data } = await axios.get(`http://universities.hipolabs.com/search?country=${university}`);
      return data;
    } catch (error) {
      console.error(error.toString());
      throw error;
    }
  };
  _dbIsPopulated = async () => {
    console.info("[INFO] - checking if the database is populated...")
    const collections = await mongoose.connection.db.listCollections().toArray().then((response) => response)
    return collections.length !== 0
  }
};
