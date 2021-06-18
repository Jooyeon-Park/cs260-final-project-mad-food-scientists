const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const recipes = require("./recipes.js");
const Recipe = recipes.model;

const commentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  recipe:{
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe'
  },
  comment: String,
    
  created: {
    type: Date,
    default: Date.now
    },
  });
  
  const Comments = mongoose.model('Comments', commentsSchema);


  //APIs////////////////////////////////////////////

  /*Add Comment*/
  router.post("/:id", validUser, async (req, res) => {
    
    const comment = new Comments({
      user: req.user,
      recipe: req.params.id,
      comment: req.body.comment
        });
    try {
      await comment.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  /*get all Comment*/
  router.get("/:id", async (req, res) => {
    try {
      let comments = await Comments.find({recipe:req.params.id}).sort({
        created: -1
      }).populate('user');
      return res.send(comments);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  module.exports = {
    model: Comments,
    routes: router,
  }