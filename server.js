if (process.env.SERVER_PORT !== "production") require("dotenv").config();
const RoutesService = require("./src/services/RoutesService");
new RoutesService().init()
