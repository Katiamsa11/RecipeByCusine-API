const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

// Read the file
function readRecipe() {
  const recipeFile = fs.readFileSync("./data/recipes.json");
  const recipeData = JSON.parse(recipeFile);
  return recipeData;
}

//created a get request
router.get("/", (req, res) => {
  // Read the file
  const recipes = readRecipe();

  //created a map function to grab a just channel,image and title of the video data
  const singularRecipe = recipes.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      description: recipe.description,
    };
  });

  res.status(200).json(singularRecipe);
});

//created a post request
router.post("/", (req, res) => {
  const { title, ingredients, method } = req.body;

  if (!title || !method || !ingredients) {
    return res
      .status(400)
      .json({ error: "please input title and description!" });
  }
  // Make a new recipe
  const newRecipe = {
    id: crypto.randomUUID(),
    title: req.body.title,
    image: "http://localhost:8000/images/borsh.jpg",
    ingredients: req.body.ingredients,
    method: req.body.method,
  };

  const recipes = readRecipe();
  recipes.push(newRecipe);
  fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));

  res.status(201).json(newRecipe);
});

//created a get request based on id
router.get("/:recipeId", (req, res) => {
  // Read the file
  const recipes = readRecipe();

  // Finding the single video whose id matches the requested id
  const singleRecipe = recipes.find(
    (recipe) => recipe.id === req.params.recipeId
  );

  res.status(200).json(singleRecipe);
});

module.exports = router;
