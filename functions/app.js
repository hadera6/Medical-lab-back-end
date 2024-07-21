const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

const userRouter = require("./../routes/userRouter");
const labfRouter = require("./../routes/labfRouter");
const patientRouter = require("./../routes/patientRouter")
const faqRouter = require("./../routes/faqRouter")
const item_reqRouter = require("./../routes/item_reqRouter")


var cors = require('cors');

const app = express();


app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, "./../public/")));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./../config/passport")(passport);

// Routes
app.use("/.netlify/functions/app/lab/api/v1", userRouter);
app.use("/.netlify/functions/app/lab/api/v1", labfRouter);
app.use("/.netlify/functions/app/lab/api/v1", patientRouter);
app.use("/.netlify/functions/app/lab/api/v1", faqRouter);
app.use("/.netlify/functions/app/lab/api/v1", item_reqRouter);

module.exports.handler = serverless(app);

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server up and running on port ${port} !`));