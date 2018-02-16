const totalLikes = (blogs) => {
    let likes = blogs.map(blog => {
        return blog.likes
    })
        .reduce(function (sum, likes) {
            return sum + likes
        }, 0)
    return likes
}

module.exports = {
    totalLikes
}
