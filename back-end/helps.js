/*helps.js for Help section in Random recipe page.
It is onnected to user model*/

const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const helpsSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    help: String,
    created: {
      type: Date,
      default: Date.now
    },
});
const Helps = mongoose.model('Helps', helpsSchema);

  //APIs/////////////////

  // add Help
router.post("/:id", validUser, async (req, res) => {     
  const help = new Helps({
    user: req.user,
    help: req.body.help
  });
  try {
    await help.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

  // get all helps
router.get("/:id", async (req, res) => {
  try {
    let helps = await Helps.find().sort({
    created: -1
  }).populate('user');
    return res.send(helps);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Helps,
  routes: router,
}