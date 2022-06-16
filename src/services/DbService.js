"use strict"
class DbService {
    constructor() {
        this.mongoose = require("mongoose")
        this.mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/universities"
    }
    connect = async () => {
        console.info("[INFO] - connecting to database")
        try {
            await this.mongoose.connect(this.mongo_uri);
            console.info("[INFO] - connected to database");
        } catch (error) {
            console.error(error.toString());
            throw error;
        }
    }


}
module.exports = { DbService }