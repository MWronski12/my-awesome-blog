import React, { useState, useEffect } from "react";
import blogService from "../../services/blog.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store";

export default function CreatePost() {
  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const [user, setUser] = useGlobalState("user");

  const naigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    blogService
      .createPost({
        title: state.title,
        content: state.content,
        userId: user.id,
      })
      .then((response) => {
        setState({ title: "", content: "" });
        naigate(`/posts/${response.data.data.id}`);
      })
      .catch((error) => {
        console.log(error.response.data.message);
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
