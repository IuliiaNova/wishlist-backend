const express = require("express");
const { addWish, getWishes, deleteWish, updateWish } = require("./controllers/wishes.controllers");
const { dbConnection } = require("./database/config");
const cors = require("cors");
const authMiddleware = require("./middleware/auth.middleware")

const app = express();

app.use(cors());

require("dotenv").config();

app.use(express.json());


app.post("/addwish", authMiddleware.jwtCheck, addWish);
app.get("/getwishes", getWishes);
app.delete("/deletewish/:id", deleteWish);
app.put("/updatewish", updateWish);



dbConnection().then( () => {
app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log(`Serving on port ${process.env.PORT}`);
});
}) 