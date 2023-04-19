const userRouter = require("express").Router()

const { signUp, getAllUsers, checkUser } = require('../controllers/user.controller')

userRouter.post('/signup', signUp)
userRouter.get('/all', getAllUsers)
userRouter.post('/check', checkUser)

module.exports = userRouter