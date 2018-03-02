import React from 'react'
import {shallow} from 'enzyme'
import Blog from "../components/Blog"

describe.only('<Blog />', () => {
    let blogComponent
    let blogHelper
    let mockHandler

    beforeEach(() => {
        blogHelper = {
            title: "test",
            author: "test",
            url: "www.test.com",
            likes: 2,
            username: "aa",
            visible: true
        }
        mockHandler = jest.fn()
        blogComponent = shallow(<Blog
            title={blogHelper.title}
            author={blogHelper.author}
            url={blogHelper.url}
            likes={blogHelper.likes}
            username={blogHelper.username}
            likeOnClick={mockHandler}
            deleteOnClick={mockHandler}
            visible={blogHelper.visible}/>)
    })

    it('shows title and author by default', () => {
        const listedinfoDiv = blogComponent.find('.listedinfo')
        expect(listedinfoDiv.text()).toContain(blogHelper.title, blogHelper.author)
    })

    it('shows details on name click', () => {
        const expected = shallow(
            <div>
                <a href={"https://www.test.com"}>www.test.com</a><br/>
                2 Likes
                <button onClick={mockHandler}>Like</button><br/>
                Added by aa<br/>
            </div>
        )
        //tämä olisi sama kuin Blog-classissa toggleDetails()
        blogComponent.setState({visible: true})
        const detailsDiv = blogComponent.find('.wrapper')
        expect(detailsDiv.text()).toContain(blogHelper.title, blogHelper.author, "Likes", "Added by", blogHelper.likes, blogHelper.username)
    })
})
