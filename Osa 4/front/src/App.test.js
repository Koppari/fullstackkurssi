import React from 'react'
import {mount} from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is logged in', () => {
        beforeAll(() => {
            const user = {
                username: 'AAA',
                token: '1234',
                name: 'AAA'
            }
            app = mount(<App/>)
            app.instance().state.user = user
        })
        
        it('shows blogs', () => {
            app.update()
            const blogComponents = app.find(Blog)
            const loginComponents = app.find(LoginForm)
            expect(blogComponents.length).toEqual(3)
            expect(loginComponents.length).toEqual(0)
        })
    })

    describe('when user is not logged in', () => {
        beforeAll(() => {
            app = mount(<App/>)
        })
        it('shows only login field', () => {
            app.update()
            const blogComponents = app.find(Blog)
            const loginComponents = app.find(LoginForm)
            expect(blogComponents.length).toEqual(0)
            expect(loginComponents.length).toEqual(1)
        })
    })
})