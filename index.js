const express = require("express");
const { addWish, getWishes, deleteWish, updateWish } = require("./controllers/wishes.controllers");
const { dbConnection } = require("./database/config");
const cors = require("cors");

const app = express();

app.use(cors());

require("dotenv").config();

dbConnection();

app.use(express.json());

app.post("/addwish", addWish);
app.get("/getwishes", getWishes);
app.delete("/deletewish/:id", deleteWish);
app.put("/updatewish", updateWish);

app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log(`Serving on port ${process.env.PORT}`);
});