const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')

const initBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful' +
                '.html',
        likes: 5,
        __v: 0
    }, {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    }
]

beforeAll(async() => {
    await Blog.remove()

    const blogObjects = initBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('HTTP', () => {
    test('GET returns all blogs', async() => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initBlogs.length)
    })

    test('GET contains a specific blog', async() => {
        const response = await api.get('/api/blogs')

        const titles = response
            .body
            .map(r => r.title)

        expect(titles).toContain('TDD harms architecture')
    })

    test('POST adds an entry and increases initBlogs size', async() => {
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

        const response = await api.get('/api/blogs')

        const titles = response
            .body
            .map(r => r.title)

        expect(response.body.length).toBe(initBlogs.length + 1)
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
