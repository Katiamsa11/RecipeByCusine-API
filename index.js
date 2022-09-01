require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require("cors");
const recipesRoutes = require("./routes/recipes.js");
const axios = require("axios");

// added middleware to allow any origin (front-end) to interact with API
app.use(cors());

app.use(express.json());

// added middleware to allow to serve static files
app.use("/images", express.static("./images"));

app.use("/recipes", recipesRoutes);

//listening on port 8000
app.listen(PORT, () => {
  console.log("App has started at port " + PORT);
});
