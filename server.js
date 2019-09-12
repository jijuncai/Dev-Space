// Imports:
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const path = require("path");

// Body Parser Middleware:
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "client/build")))
// DB Config:
//const db = require("./config/keys").mongoURI;

//这是我们的MongoDB数据库
const dbRoute =
    'mongodb+srv://jijuncai:Caijijun12@businessmatchmaker-m27fy.mongodb.net/test?retryWrites=true&w=majority';

//将我们的后端代码与数据库连接起来
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', function () {
    console.log('connected to the database')
});

//检查与数据库的连接是否成功
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Passport Middleware:
app.use(passport.initialize());

// Passport Config:
require("./config/passport.js")(passport);

// Connect To MongoDB:
/*
mongoose.connect("mongodb://localhost/DevSpace", function(err){
  if(err) {
      console.log("Error: Mongo Wasnt Connected because of: ", err);
  }
  else {
      console.log("MongoDB Connected");
  }
});
*/

// Use Routes:
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Listening
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server Running on port ${port}`));