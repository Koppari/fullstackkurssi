const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.body(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms\n',
    tokens.body(req, res)
  ].join(' ')
}))
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
