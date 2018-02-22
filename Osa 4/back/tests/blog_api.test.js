const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')
const helper = require('../utils/blog_api_helper')

describe('when blogs exist in db', async() => {
    beforeAll(async() => {
        await Blog.remove()

        const blogObjects = helper
            .initBlogs
            .map(blog => new Blog(blog))
        await Promise.all(blogObjects.map(blog => blog.save()))
    })

    describe('GET', () => {
        test('GET returns all blogs', async() => {
            const blogsInDb = await helper.blogsInDb()

            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.length).toBe(blogsInDb.length)

            const returnedContents = response
                .body
                .map(blog => blog.content)
            blogsInDb.forEach(blog => {
                expect(returnedContents).toContain(blog.content)
            })
        })

        test('GET returns a specific blog', async() => {
            const blogsInDb = await helper.blogsInDb()
            const blog = blogsInDb[1]

            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.content).toBe(blog.content)
        })

        test('GET returns 404 when a valid id doesnt exist', async() => {
            const nonExistingBlog = await helper.nonExistingId()

            const response = await api
                .get(`/api/notes/${nonExistingBlog}`)
                .expect(404)
        })

        test('GET returns 404 when an invalid id doesnt exist', async() => {
            const invalidId = "5a3d5da59070081a8888888"

            const response = await api
                .get(`/api/notes/${invalidId}`)
                .expect(404)
        })
    })

    describe('POST', () => {
        test('POST adds a valid entry', async() => {
            const blogsAtStart = await helper.blogsInDb()

            const newBlog = {
                title: "123",
                author: "A. A",
                url: "test.com",
                likes: 2
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAfterPOST = await helper.blogsInDb()

            expect(blogsAfterPOST.length).toBe(blogsAtStart.length + 1)

            const titles = blogsAfterPOST.map(blog => blog.title)
            expect(titles).toContain('123')
        })

        test('POST with no likes value gives likes: 0', async() => {
            const newBlog = {
                title: "123",
                author: "A. A",
                url: "test.com"
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')

            const likes = response
                .body
                .map(r => r.likes)

            expect(likes.slice(-1).pop()).toBe(0)
        })

        test('POST with no title and url returns 400', async() => {
            const newBlog = {
                likes: 1
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        })
    })

    afterAll(() => {
        server.close()
    })

})
