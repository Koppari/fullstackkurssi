const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const Blog = require('../models/Blog')

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', {__v: 0, user: 0})
    response.json(users.map(User.format))
})

usersRouter.post('/', async(request, response) => {
    try {
        const body = request.body

        const checkDuplicate = await User.find({username: body.username})

        if (checkDuplicate.length > 0 || body.username.trim().length === 0) 
            return response.status(400).json({e: 'Existing or invalid username.'})

        if (body.password.length < 3) 
            return response.status(400).json({e: 'Password should be >= 3 characters long!'})

        if (body.adult === undefined) 
            body.adult = true

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({username: body.username, name: body.name, passwordHash, adult: body.adult})

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (e) {
        response
            .status(500)
            .json({e: '500'})
    }
})

module.exports = usersRouter
