const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)
const User = require('../models/User')
const helper = require('../utils/users_api_helper')

describe('when users exist in db', async() => {
    beforeAll(async() => {
        await User.remove()
        const userObjects = helper
            .initUsers
            .map(user => new User(user))
        await Promise.all(userObjects.map(user => user.save()))
    })

    describe('POST', async() => {
        test('POST returns 400 when password > 3 chars', async() => {
            const newUser = {
                username: "Test",
                name: "Test Testinen",
                password: "pw",
                adult: true
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        test('POST returns 400 when username not unique', async() => {
            const newUser = {
                username: "Test",
                name: "Tast Tastinen",
                password: "pw123",
                adult: true
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        test('POST returns adult: true if no value set', async() => {
            const users = await helper.usersInDb()

            const newUser = {
                username: "A",
                name: "B",
                password: "pw123"
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAfterPOST = await helper.usersInDb()

            const adult = usersAfterPOST.map(u => u.adult)
            expect(adult.slice(-1).pop()).toEqual(true)
        })
    })

    afterAll(() => {
        server.close()
    })

})