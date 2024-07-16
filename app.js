const express = require("express");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
//middleware
app.use(express.json());

// Connexion à la base données
mongoose
  .connect(process.env.DATABASECLOUD)
  .then(() => {
    console.log("DataBase Successfully Connected");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
    process.exit();
  });

app.use("/api/scategories", scategorieRouter);
app.use("/api/categories", categorieRouter);
app.use("/api/articles", articleRouter);
app.listen(process.env.PORT);
console.log("Application Run At Port" + process.env.PORT);
module.exports = app;
