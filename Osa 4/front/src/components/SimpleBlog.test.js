import React from 'react'
import {shallow} from 'enzyme'
import SimpleBlog from "../components/SimpleBlog"

describe.only('<SimpleBlog />', () => {
    it('renders title, author and likes', () => {
        const blog = {
            title: "test",
            author: "test",
            likes: 2
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog}/>)
        const contentDiv = simpleBlogComponent.find('.content')

        expect(contentDiv.text()).toContain(blog.title, blog.author, blog.likes)
    })

    it('clicking like twice calls onClick function twice', () => {
        const blog = {
            title: "test",
            author: "test",
            likes: 0
        }

        const mockHandler = jest.fn()
        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
    
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})