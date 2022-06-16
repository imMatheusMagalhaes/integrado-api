const mongoose = require("mongoose");

module.exports = class DbService {
    connect = async (mongoURI) => {
        console.info("[INFO] - connecting to database")
        try {
            await mongoose.connect(mongoURI);
            console.info("[INFO] - connected to database");
        } catch (error) {
            console.error(error.toString());
            throw error;
        }
    }


}