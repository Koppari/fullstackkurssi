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

    console.log(blog.title, blog.author);
    expect(contentDiv.text()).toContain(blog.title, blog.author, blog.likes)
  })
})