const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const passport = require('passport')
const path = require('path')

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const user = require("./routes/api/user");
const todo = require("./routes/api/todo")

//MongoDB connection.
mongoose.connect(
  process.env.MONGO_URI
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongo bağlandı.");
});

app.use(passport.initialize());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

require('./config/passport')(passport)

//Route dfn.
app.use("/api/user", user);
app.use("/api/todo", todo)
app.use(express.static("static"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "index.html"));
});

//App start
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
