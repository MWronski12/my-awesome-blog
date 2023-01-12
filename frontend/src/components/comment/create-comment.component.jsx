import React, { useState, useEffect } from "react";
import blogService from "../../services/blog.service";
import { useGlobalState } from "../../store";

export default function AddComment({ postId, newCommentCallback }) {
  const [user, setUser] = useGlobalState("user");
  const [state, setState] = useState({ comment: "" });

  function onChange(e) {
    setState({ ...state, comment: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    blogService
      .createComment({
        userId: user.id,
        postId: postId,
        content: state.comment,
      })
      .then((response) => {
        setState({ ...state, comment: "" });
        newCommentCallback();
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
