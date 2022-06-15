"use strict";
const { model } = require("mongoose");
const University = model("University", {
  domains: [String],
  web_pages: [String],
  "state-province": String || null,
  name: String,
  country: String,
  alpha_two_code: String,
});
module.exports = University;
