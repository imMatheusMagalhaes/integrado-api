"use strict"
const axios = require("axios");
const { universities } = require("../helpers/Universities");
const UniversityModel = require("../models/UniversityModel");
const UniversityRepository = require("../repositories/UniversityRepository");

module.exports = class LoaderService {
  runLoaders = async () => {
    this._initialDbPopulation()
  };
  _initialDbPopulation = async () => {
    return await Promise.all(
      universities.map(async (university) => {
        const data = await this._getUniversityData(university);
        await this._saveUniversityData({ data, university });
      })
    );
  }
  _saveUniversityData = async (params) => {
    const { data, university } = params;
    try {
      const universityRepository = new UniversityRepository(UniversityModel(university));
      return await universityRepository.create({ target_object: data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  _getUniversityData = async (university) => {
    try {
      const { data } = await axios.get(`http://universities.hipolabs.com/search?country=${university}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
