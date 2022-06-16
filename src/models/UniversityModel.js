"use strict";
const { model, Schema, models } = require("mongoose");

const UniversityModel = (university) => {
  const schema = new Schema({
    domains: [String],
    web_pages: [String],
    "state-province": String || null,
    name: String,
    country: String,
    alpha_two_code: String,
  });
  return models[`${university}University`] || model(`${university}University`, schema, university);
};
module.exports = UniversityModel;
