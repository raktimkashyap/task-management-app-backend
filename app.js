const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./utils/db/dbConnection");
const routes = require("./routes/index");
const cors = require("cors");
const { request } = require("express");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Management Application");
});
app.use("/api/v1", routes);

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
