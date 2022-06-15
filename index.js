require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UnivercityController = require("./src/controllers/UnivercityController");

const server = express();
const univercityController = new UnivercityController();
const server_port = process.env.SERVER_PORT || 3000;

server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(express.json());
server.use("/univercity", univercityController.getRoutes());
server.get("/", (_, response) => {
  response.sendStatus(404);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    server.listen(server_port, () =>
      console.info(`listening on port ${server_port}`)
    );
  })
  .catch((err) => console.log(err));
