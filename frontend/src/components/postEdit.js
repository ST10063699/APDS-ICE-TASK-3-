/*return (
    <div className="container">
        <h3 className="header">Create New Post</h3>
        <form onSubmit={onSubmit} className="form">
            <div className="form-group">
                <label htmlFor="user">User</label>
                <input 
                    type="text"
                    className="form-control"
                    id="user"
                    value={form.user}
                    disabled  // make the user field read-only
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <input 
                    type="text"
                    className="form-control"
                    id="content"
                    value={form.content}
                    onChange={(e) => updateForm({ content: e.target.value })}  // Corrected arrow function
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input 
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>

            <div className="form-group">
                <input
                    type="submit"
                    value="Create Post"
                    className="btn btn-primary"
                />
            </div>
        </form>
    </div>
);*/
