import React, { useState, useEffect } from "react";
import blogService from "../../services/blog.service";
import authService from "../../services/auth.service";
import { withRouter } from "react-router-dom";

function CreatePost() {
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setState({
        showAdminContent: user.roles.includes("ADMIN"),
      });
    }
  });

  function onSubmit(e) {
    e.preventDefault();

    blogService
      .createPost({
        title: state.title,
        content: state.content,
        userId: authService.getCurrentUser().id,
      })
      .then((response) => {
        setState({ title: "", content: "" });
        props.history.push(`/awesome-blog/posts/${response.data.postId}`);
      });
  }

  function onTitleChange(e) {
    setState({ ...state, title: e.target.value });
  }

  function onContentChange(e) {
    setState({ ...state, content: e.target.value });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={onTitleChange}
            value={state.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Post content
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={onContentChange}
            value={state.content}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default withRouter(CreatePost);
