const mongoose = require("mongoose");

const connectDB = (dbURL) => {
  return mongoose
    .connect(dbURL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`\nDATABASE CONNECTED`);
      console.log(`-------------------------------`);
    })
    .catch((err) => {
      console.log("DATABASE CONNECTION ERROR:\n", err);
      process.exit();
    });
};

module.exports = connectDB;
