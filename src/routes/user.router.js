const express = require("express")
const userRouter = express.Router()

const { 
  createUser, 
  loginUser, 
  createUserGoogle,
  loginUserGoogle
} = require('../controllers/user.controller')

userRouter.post('/', createUser)
userRouter.post('/createusergoogle', createUserGoogle)
userRouter.post('/loginuser', loginUser)
userRouter.post('/loginusergoogle', loginUserGoogle)

module.exports = userRouter