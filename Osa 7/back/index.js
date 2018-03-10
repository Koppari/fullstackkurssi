const http = require('http')
const express = require('express')
const app = express()
const config = require('./utils/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const morgan = require('morgan')
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('DB:', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })
  
mongoose.Promise = global.Promise

if (process.env.NODE_ENV !== 'test') {
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
}
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.error)

app.use(express.static('build'))

const server = http.createServer(app)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose
    .connection
    .close()
})

module.exports = {
  app,
  server
}
