if (process.env.SERVER_PORT !== "production") require("dotenv").config();
const express = require("express");
const UniversityController = require("./src/controllers/UniversityController");
const DbService = require("./src/services/DbService");
const LoaderService = require("./src/services/LoaderService");

const server = express();
const universityController = new UniversityController();
const loaderService = new LoaderService();
const dbService = new DbService()
const server_port = process.env.SERVER_PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/universities", universityController.getRoutes());
server.get("/", (_, response) => { response.sendStatus(404) });

dbService.connect(process.env.MONGO_URI).then(() => {
  server.listen(server_port, async () => {
    console.info(`[INFO] - server listening on port ${server_port}`)
    await loaderService.runLoaders()
  });
})
