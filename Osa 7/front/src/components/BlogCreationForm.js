import React from 'react'
import {Button} from 'semantic-ui-react'

const BlogCreationForm = ({handleSubmit, onChange, title, author, url}) => {
    return (
        <div className="ui form">
            <form onSubmit={handleSubmit} style={{width: "370px"}}>
                <div>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        placeholder="Title"/>
                </div>
                <div>
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={onChange}
                        placeholder="Author"/>
                </div>
                <div>
                    <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={onChange}
                        placeholder="Url"/>
                </div>
                <Button className="ui primary button" size="tiny">Create</Button>
            </form>
        </div>
    )
}

export default BlogCreationForm