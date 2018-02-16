const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response
                    .status(404)
                    .end
            }
        })
        .catch(error => {
            response
                .status(404)
                .send({error: '404'})
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response
                .status(201)
                .json(result)
        })
})

module.exports = blogsRouter
