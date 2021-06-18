const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./users.js");
const recipes = require("./recipes.js");
const comments = require("./comments.js");
const helps = require("./helps.js");

//setup express
const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// DB name = mfs
mongoose.connect('mongodb://localhost:27017/mfs', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use("/api/users", users.routes);
app.use("/api/recipes", recipes.routes);
app.use("/api/comments", comments.routes);
app.use("/api/helps", helps.routes);
app.listen(3002, () => console.log('Server listening on port 3002!'));
