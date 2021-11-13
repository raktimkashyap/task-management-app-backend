const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./utils/db/dbConnection");
const routes = require("./routes/index");
require("dotenv").config();

app.use(express.json());
app.use("/api", routes);

// MAIN
(async () => {
  try {
    console.clear();
    await connectDB(process.env.ATLAS_URI);
    app.listen(port, () => {
      console.log(`SERVER STARTED ON PORT:`, port);
      console.log(`-------------------------------\n`);
    });
  } catch (err) {
    console.log(err);
  }
})();
