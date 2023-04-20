const wishesRouter = require('express').Router()
const { addWish, getWishes, deleteWish, updateWish, updateWishState } = require("../controllers/wishes.controllers");
const authMiddleware = require("../middleware/auth.middleware")


wishesRouter.post("/addwish", authMiddleware.jwtCheck, addWish);
wishesRouter.get("/getwishes", getWishes);
wishesRouter.delete("/deletewish/:id", deleteWish);
wishesRouter.put("/updatewish", updateWish);
wishesRouter.put("/updatewish", updateWishState);

module.exports = wishesRouter