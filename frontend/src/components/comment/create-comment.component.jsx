import React, { useState } from "react";
import blogService from "../../services/blog.service";
import { useGlobalState } from "../../store";

export default function CreateComment({ postId, newCommentCallback }) {
  const [user, setUser] = useGlobalState("user");
  const [state, setState] = useState({ comment: "" });

  function onChange(e) {
    setState({ comment: e.target.value });
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
        setState({ comment: "" });
        newCommentCallback();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  return (
    <div>
      {user && (
        <form className="w-100 my-3 d-flex flex-column" onSubmit={onSubmit}>
          <label htmlFor="comment" className="form-label">
            Add Comment
          </label>
          <span className="d-flex">
            <input
              type="text"
              className="form-control flex-grow-1"
              id="comment"
              onChange={onChange}
              value={state.comment}
            />
            <button type="submit" className={"btn btn-secondary disabled"}>
              Submit
            </button>
          </span>
        </form>
      )}
    </div>
  );
}
