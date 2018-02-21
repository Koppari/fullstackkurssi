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
        console.log("Exception catched!");
        response
            .status(404)
            .json({e: '404'})
    }
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    if (blog.likes === undefined) {
        blog.likes = 0
    }

    blog
        .save()
        .then(result => {
            response
                .status(201)
                .json(result)
        })
        .catch(e => {
            console.log(e);
            response
                .status(500)
                .json({e: "Error!"})
        })
})

module.exports = blogsRouter
