const mongoose = require("mongoose");
const Config = require("../config/config")

/*const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Could not initialize DB");
  }
};

module.exports = {
  dbConnection,
}; */

function connectDB(){
  return mongoose.connect(Config.db.uri)
}

module.exports = connectDB