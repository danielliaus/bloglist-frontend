import React, { useState, forwardRef, useImperativeHandle } from "react";

const BlogForm = ({ createBlog }, refs) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    await createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        title:{" "}
        <input name="title" value={newBlog.title} onChange={handleChange} />{" "}
        <br />
        author:{" "}
        <input
          name="author"
          value={newBlog.author}
          onChange={handleChange}
        />{" "}
        <br />
        url: <input
          name="url"
          value={newBlog.url}
          onChange={handleChange}
        />{" "}
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
