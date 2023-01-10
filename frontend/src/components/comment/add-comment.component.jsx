import React, { useState, useEffect } from "react";
import authService from "../../services/auth.service";
import blogService from "../../services/blog.service";

export default function AddComment() {
  const [state, setState] = useState({
    user: undefined,
    comment: "",
  });

  useEffect(() => {
    BlogService.getPostComments(props.postId).then((response) => {
      setState({ ...state, comments: response.data });
    });
  });

  function onChange(e) {
    setState({ ...state, comment: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    blogService
      .createComment({
        userId: state.user.id,
        postId: props.postId,
        content: state.comment,
      })
      .then((response) => {
        setState({ ...state, comment: "" });
        props.newCommentCallback();
      });
  }

  return (
    <div>
      {state.user && (
        <form className="w-100 my-3 d-flex flex-column" onSubmit={onSubmit}>
          <label htmlFor="comment" className="form-label">
            Add Comment
          </label>
          <span className="d-flex">
            <input
              type="text"
              className="form-control flex-grow-1 mr-3"
              id="comment"
              onChange={onChange}
              value={state.comment}
            />
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </span>
        </form>
      )}
    </div>
  );
}
