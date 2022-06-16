require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UniversityController = require("./src/controllers/UniversityController");
const LoaderService = require("./src/services/LoaderService");

const server = express();
const universityController = new UniversityController();
const loaderService = new LoaderService();
const server_port = process.env.SERVER_PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/university", universityController.getRoutes());
server.get("/", (_, response) => { response.sendStatus(404) });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    server.listen(server_port, () =>
      console.info(`listening on port ${server_port}`)
    );
    loaderService.runLoaders();
  })
  .catch((err) => console.log(err));
