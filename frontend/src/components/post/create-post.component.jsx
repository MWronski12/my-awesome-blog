// React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store";

// Services
import blogService from "../../services/blog.service";

// Common
import ValidationError from "../../common/validation-error";

export default function CreatePost() {
  const [user, setUser] = useGlobalState("user");
  const navigate = useNavigate();

  const [state, setState] = useState({ title: "", content: "", error: null });

  function onSubmit(e) {
    e.preventDefault();

    if (state.title === "" || state.content === "") {
      setState({ ...state, error: "Both fields are required!" });
      return;
    }

    blogService
      .createPost({
        title: state.title,
        content: state.content,
        userId: user.id,
      })
      .then((response) => {
        navigate(`/posts/${response.data.post.id}`);
      })
      .catch((error) => {
        console.log(error);
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
      {user && (
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              autoFocus
              type="text"
              className="form-control"
              id="title"
              onChange={onTitleChange}
              value={state.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Post content
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="3"
              onChange={onContentChange}
              value={state.content}
            ></textarea>
          </div>
          {state.error && <ValidationError message={state.error} />}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
