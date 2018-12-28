const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

const dbPW = "WLaSw4ryDGnkisQC";

mongoose
  .connect(
    `mongodb+srv://mongoUser:${dbPW}@cluster0-1e4le.mongodb.net/mean?retryWrites=true`, {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Failed connection to database!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
2;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
