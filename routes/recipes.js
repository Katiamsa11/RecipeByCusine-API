const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

function readRecipe() {
  const recipeFile = fs.readFileSync("./data/recipes.json");
  const recipeData = JSON.parse(recipeFile);
  return recipeData;
}

router.get("/", (req, res) => {
  // Read the file
  const recipes = readRecipe();

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

router.post("/", (req, res) => {
  const { title, ingredientsData, directions } = req.body;

  if (!title || !directions || !ingredientsData) {
    return res
      .status(400)
      .json({ error: "please input title and description!" });
  }

  const newRecipe = {
    id: crypto.randomUUID(),
    title: req.body.title,
    image: "http://localhost:9000/images/cooking.jpg",
    ingredients: req.body.ingredientsData,
    directions: req.body.directions,
    time: "2 hours",
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

  const singleRecipe = recipes.find(
    (recipe) => recipe.id === req.params.recipeId
  );

  res.status(200).json(singleRecipe);
});

module.exports = router;
