const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./routes/user.router')
const wishesRouter = require('./routes/wishes.router')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use('/user', userRouter)
app.use('/wish', wishesRouter)

module.exports = app
