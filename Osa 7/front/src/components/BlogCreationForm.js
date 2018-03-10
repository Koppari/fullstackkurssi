import React from 'react'

const BlogCreationForm = ({handleSubmit, onChange, title, author, url}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button>Create</button>
            </form>
        </div>
    )
}

export default BlogCreationForm