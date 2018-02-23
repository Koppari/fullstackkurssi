const User = require('../models/User')

const initUsers = [
    {
        username: "Test",
        name: "Test Testinen",
        password: "pw123",
        adult: true
    }, {
        username: "Asdf",
        name: "Qwer Tyui",
        password: "pw321",
        adult: false
    }
]

const format = (user) => {
    return {id: user._id, username: user.username, name: user.name, adult: user.adult}
}

const nonExistingId = async() => {
    const user = new Blog()
    await user.save()
    await user.remove()

    return user
        ._id
        .toString()
}

const usersInDb = async() => {
    const users = await User.find({})
    return users
}

module.exports = {
    initUsers,
    format,
    nonExistingId,
    usersInDb
}
