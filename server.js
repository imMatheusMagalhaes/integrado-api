if (process.env.NODE_ENV !== "production") require("dotenv").config();
const RoutesService = require("./src/services/RoutesService");
new RoutesService().init()
