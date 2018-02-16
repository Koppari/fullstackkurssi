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

const mostBlogs = (blogs) => {
    let authors = blogs.map(blog => {
        return blog.author
    })
    if (authors.length > 1) {
        return authors.sort((a, b) => authors.filter(author => author === a).length - authors.filter(author => author === b).length).pop();
    } else {
        return authors[0]
    }
}

const mostLikes = (blogs) => {
    let countLikes = blogs.reduce((prev, curr) => {
        let total = prev.get(curr.author) || 0
        prev.set(curr.author, curr.likes + total)
        return prev
    }, new Map());

    let countLikesToMap = [...countLikes].map(([author, likes]) => {
        return {author, likes}
    })

    let highestLikes = Math
        .max
        .apply(Math, countLikesToMap.map((o) => {
            return o.likes
        }))

    return author = countLikesToMap
        .find(author => author.likes === highestLikes)
        .author
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
