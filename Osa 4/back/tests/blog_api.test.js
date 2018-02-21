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

    let blogObject = new Blog(initBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initBlogs.length)
})

test('a specific blog is found', async() => {
    const response = await api.get('/api/blogs')

    const titles = response
        .body
        .map(r => r.title)

    expect(titles).toContain('TDD harms architecture')
})

afterAll(() => {
    console.log("Closing server");
    server.close()
})
