require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require("cors");
const recipesRoutes = require("./routes/recipes.js");
const axios = require("axios");
const API_URL = "https://api.yelp.com/v3/businesses/search?location=toronto";
const API_KEY =
  "SYFPNjTnFMkHD_xE5QPT3cwtgrrHenIGPkwgjhdxoNBkCvtzHAB99d1tTaOnIM_Lfp8WNv4cm-lViq-7wWvJLcEM3kZotncG41LyAvUrcoZX3uAVNflqhoyFJL4PY3Yx";
axios.defaults.headers.common = {
  Authorization: "Bearer " + API_KEY,
};

app.use(cors());

app.use(express.json());

app.use("/images", express.static("./images"));

app.use("/recipes", recipesRoutes);

app.get("/restaurants", (req, res) => {
  axios
    .get(API_URL)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
});

//listening on port 9000
app.listen(PORT, () => {
  console.log("App has started at port " + PORT);
});
