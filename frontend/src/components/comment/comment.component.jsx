import React, { useEffect, useState } from "react";
import BlogService from "../../services/blog.service";

export default function Comment() {
  const [state, setState] = useState({
    comment: null,
    username: null,
  });

  useEffect(() => {
    BlogService.getComment(props.id)
      .then((response) => {
        setState({ ...state, comment: response.data });
      })
      .then(() =>
        BlogService.getUserName(state.comment.userId).then((response) => {
          setState({
            ...state,
            username: response.data.username,
          });
        })
      );
  });

  return (
    <div className="my-1">
      {state.comment && state.username && (
        <div className="d-flex flex-column">
          <span>
            <span>{state.username + " "}</span>
            <span className="text-muted">
              {BlogService.formatDate(state.comment.createdAt)}
            </span>
          </span>
          <span>{state.comment.content}</span>
        </div>
      )}
    </div>
  );
}
