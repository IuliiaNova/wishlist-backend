const wishesRouter = require('express').Router()

const { 
  addWish, 
  getWishes, 
  deleteWish, 
  updateWish, 
  updateWishState 
} = require("../controllers/wishes.controllers");

const authMiddleware = require("../middleware/auth.middleware")


wishesRouter.post("/addwish", authMiddleware.jwtCheck, addWish);
wishesRouter.get("/getwishes", authMiddleware.jwtCheck, getWishes);
wishesRouter.delete("/deletewish/:id", authMiddleware.jwtCheck, deleteWish);
wishesRouter.put("/updatewish", authMiddleware.jwtCheck, updateWish);
wishesRouter.put("/updatewish", authMiddleware.jwtCheck, updateWishState);

module.exports = wishesRouter