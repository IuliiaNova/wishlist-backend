const express = require("express")
const wishesRouter = express.Router()

const { 
  addWish, 
  updateWish, 
  updateWishState,
  deleteWish
} = require("../controllers/wishes.controllers");


const checkJWT = require("../middleware/checkJWT")

wishesRouter.post("/", checkJWT, addWish);
wishesRouter.put("/updatewish", checkJWT, updateWish);
wishesRouter.put("/updatewishstate", checkJWT, updateWishState);
wishesRouter.delete("/deletewish", checkJWT, deleteWish);


module.exports = wishesRouter