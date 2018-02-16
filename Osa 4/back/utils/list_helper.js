const totalLikes = (blogs) => {
    let likes = blogs.map(blog => {
        return blog.likes
    })
        .reduce(function (sum, likes) {
            return sum + likes
        }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    //maps blog.likes, then finds index of max value in another map/reduce
    let fav = blogs
        .map(blog => {
        return blog.likes
    })
        .indexOf(blogs.map(blog => {
            return blog.likes
        }).reduce(function (sum, likes) {
            return Math.max(sum, likes)
        }, 0))
    return blogs[fav]
}

module.exports = {
    totalLikes,
    favoriteBlog
}
