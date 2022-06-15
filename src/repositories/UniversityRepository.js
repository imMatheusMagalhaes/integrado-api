"use strict";
const University = require("../models/UniversityModel");
module.exports = class UniversityRepository {
  constructor() {
    this.model = University;
  }
  create = async (obj) => {
    const { target_object } = obj;
    const data = await this.model.insertMany(target_object, {
      lean: true,
    });
    this._checkIfError({ data, obj, method: this.create.name });
    return data;
  };
  find = async (obj) => {
    const { target_object } = obj;
    const data = await this.model.find(target_object).lean();
    this._checkIfError({ data, obj, method: this.find.name });
    return data;
  };
  update = async (obj) => {
    const { target_object, desired_object } = obj;
    const data = await this.model.findOneAndUpdate(
      target_object,
      desired_object,
      {
        new: true,
        lean: true,
      }
    );
    this._checkIfError({ data, obj, method: this.update.name });
    return data;
  };
  delete = async (obj) => {
    const { target_object } = obj;
    const data = await this.model.deleteOne(target_object);
    this._checkIfError({ data, obj, method: this.delete.name });
    return data;
  };
  _checkIfError(params) {
    const { data, obj, method } = params;
    if (data === null || data === undefined) {
      throw new Error(
        `could not ${method} ${JSON.stringify(obj.target_object)}`
      );
    }
  }
};
