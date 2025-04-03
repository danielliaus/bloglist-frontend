import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogList = () => <BlogList blogs={blogs} />;

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    blogFormRef.current.toggleVisibility();
    setSuccessMessage(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const blogForm = () => (
    <div>
      <Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  );

  const loginForm = () => (
    <div>
      <LoginForm />
    </div>
  );

  return (
    <div>
      {user === null ? (
        <>
          {loginForm()}
          <Notification message={errorMessage} />
        </>
      ) : (
        <div>
          <h1>blogs</h1>
          <Notification message={successMessage} />
          {user.name} logged-in
          <button onClick={handleLogout}>Logout</button>
          {blogForm()} <br />
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
