let token = null

const blogs = [
    {
        id: "5a976725c78a1b21b49fb4f3",
        user: {
            _id: "5a907f095e8f121700adb0e5",
            username: "AAA"
        },
        title: "Another One",
        author: "Dj. Khaled",
        url: "www.anotha.one",
        likes: 7
    }, {
        id: "5a981f088e273814609cefd0",
        user: {
            _id: "5a907f095e8f121700adb0e5",
            username: "AAA"
        },
        title: "Bish",
        author: "Bosh",
        url: "www.bishbosh.com",
        likes: 6
    }, {
        id: "5a983941b259b21568b410f3",
        user: {
            _id: "5a908463a670f30dec3c8440",
            username: "BBB"
        },
        title: "BBB blogi",
        author: "BBB",
        url: "www.bbb.com",
        likes: 1
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default {
    getAll,
    blogs
}
