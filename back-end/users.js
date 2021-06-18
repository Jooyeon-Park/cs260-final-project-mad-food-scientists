const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");
//express
const router = express.Router();

const userSchema = new mongoose.Schema({
  email: String,
  favorite: String,
  username: String,
  password: String,
});

//Security
userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // Hash
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Check if password matches
userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

//User model
const User = mongoose.model('User', userSchema);

/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  next();
};

/* APIs */

// create
router.post('/', async (req, res) => {
  if (!req.body.email || !req.body.username || !req.body.password)
    return res.status(400).send({
      message: "Email address, username and password are required"
    });

  try {
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser)
      return res.status(403).send({
        message: "username already exists"
      });
    const user = new User({
      email: req.body.email,
      favorite: req.body.favorite,
      username: req.body.username,
      password: req.body.password
    });

    await user.save();
    req.session.userID = user._id;

    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// login a user
router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);

  try {
    //  lookup user record
    const user = await User.findOne({
      username: req.body.username
    });
    // Error: User does not exist.
    if (!user)
      return res.status(403).send({
        message: "username or password is wrong"
      });
    // Error: Worng Password
    if (!await user.comparePassword(req.body.password))
      return res.status(403).send({
        message: "username or password is wrong"
      });

    // set user session info
    req.session.userID = user._id;

    return res.send({
      user: user
    });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get logged in user
router.get('/', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// logout
router.delete("/", validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


module.exports = {
  routes: router,
  model: User,
  valid: validUser
};
