
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

  const recipeSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    path: String,
    title: String,
    description: String,
    ingredients: String,
    //ratings: String,      *Dropped
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  
// upload
router.post("/", validUser, upload.single('recipe'), async (req, res) => {
    // Error if user don't upload a file
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const recipe = new Recipe({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
      ingredients: req.body.ingredients,
      description: req.body.description,
    });
    try {
      await recipe.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  // get all of 'my recipe'
router.get("/", validUser, async (req, res) => {
    // return recipes
    try {
      let recipes = await Recipe.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(recipes);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get all recipes
router.get("/all", async (req, res) => {
  try {
    let recipes = await Recipe.find().sort({
      created: -1
    }).populate('user');
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get one recipe --> for RecipePage.vue
router.get('/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({_id: req.params.id}).populate('user');
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete recipe
router.delete('/:id',validUser, async(req,res)=>{
  try{
      await Recipe.deleteOne({ _id: req.params.id });
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

//Edit Recipe 
router.put('/:id', validUser, async (req, res) => {
  try {
      let recipe = await Recipe.findOne({_id: req.params.id});
      if (!recipe) {
          res.send(404);
          return;
      }
      recipe.title = req.body.title;
      recipe.description = req.body.description;
      recipe.ingredients = req.body.ingredients;

      await recipe.save();
      res.send(recipe);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

  module.exports = {
    model: Recipe,
    routes: router,
  }
  