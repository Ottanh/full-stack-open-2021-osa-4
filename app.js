
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
require('express-async-errors')

const morgan = require('morgan')
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', { skip: (req, res) => process.env.NODE_ENV === 'test' }))

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
//app.use('/api/blogs', middleware.tokenExtractor)
//app.use('/api/blogs', middleware.userExtractor)

app.use('', blogsRouter)
app.use('', usersRouter)
app.use('', loginRouter)
app.use(middleware.errorHandler)


module.exports = app