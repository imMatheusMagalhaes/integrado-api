"use strict"
const { model, Schema, models } = require("mongoose");

const UniversityModel = (country) => {
  const schema = new Schema({
    domains: { type: [String] },
    web_pages: { type: [String] },
    "state-province": { type: String || null },
    name: { type: String, unique: true },
    country: { type: String, unique: true },
    alpha_two_code: String,
  });
  return models[`${country}University`] || model(`${country}University`, schema, country);
};
module.exports = UniversityModel;
