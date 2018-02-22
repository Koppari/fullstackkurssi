const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (blog) {
            response.json(blog)
        } else {
            response
                .status(404)
                .end
        }
    } catch (e) {
        response
            .status(404)
            .json({e: '404'})
    }
})

blogsRouter.post('/', async(request, response) => {
    try {
        const body = request.body

        if (body.likes === undefined) {
            body.likes = 0
        }
        if (body.title === undefined && body.url === undefined) {
            return response
                .status(400)
                .json({error: "A blog must have a title and an url!"})
        }

        const blog = new Blog({title: body.title, author: body.author, url: body.url, likes: body.likes})

        const savedBlog = await blog.save()
        response.json(savedBlog)
    } catch (e) {
        console.log("Exception catched!");
        response
            .status(500)
            .json({e: '500'})
    }
})

blogsRouter.put('/:id', async(request, response) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
        response.json(updatedBlog)
    } catch (e) {
        response
            .status(404)
            .json({e: '404'})
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response
            .status(204)
            .end()
    } catch (e) {
        response
            .status(404)
            .json({e: '404'})
    }
})

module.exports = blogsRouter
