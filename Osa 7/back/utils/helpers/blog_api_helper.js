const Blog = require('../models/Blog')
const User = require('../models/User')

const initBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful' +
                '.html',
        likes: 5,
        userId: 123,
        __v: 0
    }, {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        userId: 123,
        __v: 0
    }
]

const format = (blog) => {
    return {id: blog._id, title: blog.title, author: blog.author, author: blog.author, likes: blog.likes}
}

const nonExistingId = async() => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog
        ._id
        .toString()
}

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async() => {
    const users = await User.find({})
    return users
}

module.exports = {
    initBlogs,
    format,
    nonExistingId,
    blogsInDb
}
