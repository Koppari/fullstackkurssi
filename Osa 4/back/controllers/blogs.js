const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {
            _id: 1,
            username: 1
        })
    response.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async(request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        blog
            ? response.json(blog)
            : response
                .status(500)
                .end
    } catch (e) {
        response
            .status(404)
            .json({e: '404'})
    }
})

blogsRouter.post('/', async(request, response) => {
    const body = request.body
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({error: 'Token missing or invalid!'})
        }
        if (body.likes === undefined) {
            body.likes = 0
        }
        if (body.title === undefined && body.url === undefined) {
            return response
                .status(400)
                .json({error: "A blog must have a title and an url!"})
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({title: body.title, author: body.author, url: body.url, likes: body.likes, user: user._id})
        const savedBlog = await blog.save()

        user.blogs = user
            .blogs
            .concat(savedBlog._id)
        await user.save()

        response.json(Blog.format(savedBlog))
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            response
                .status(401)
                .json({e: e.message})
        } else 
            response
                .status(500)
                .json({e: '500'})
        }
})

blogsRouter.put('/:id', async(request, response) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
        response.json(Blog.format(updatedBlog))
    } catch (e) {
        response
            .status(404)
            .json({e: '404'})
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({error: 'Invalid token for deletion'})
        }

        const blog = await Blog.findById(request.params.id)
        const creatorUser = await User.findById(blog.user)
        const currentUser = await User.findById(decodedToken.id)

        if (creatorUser.id === currentUser.id) {
            await Blog.findByIdAndRemove(request.params.id)
            response
                .status(204)
                .end()
        } else {
            return response
                .status(401)
                .json({error: 'Unauthorized deletion!'})
        }
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            response
                .status(401)
                .json({e: e.message})
        } else 
            response
                .status(500)
                .json({e: '500'})
        }
}})

module.exports = blogsRouter
