// React
import React from "react";
import { useGlobalState } from "../../store";

// Components
import blogService from "../../services/blog.service";
import authService from "../../services/auth.service";

export default function CommentDetails({ comment, deleteCommentCallback }) {
  const [user, setUser] = useGlobalState("user");

  function onDelete() {
    blogService
      .deleteComment(comment.postId, comment.id)
      .then((response) => {
        deleteCommentCallback(comment);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  return (
    <div className="my-1">
      <div className="d-flex flex-column">
        <span className="d-flex align-items-center">
          <span className="text-muted flex-grow-1">
            {comment.user ? comment.user.username : user.username +
              " " +
              blogService.formatDate(comment.createdAt)}
          </span>
          {user && (authService.isAdminOrModerator(user) ||
            user.id === comment.userId) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-x-circle delete-comment"
                viewBox="0 0 16 16"
                onClick={onDelete}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            )}
        </span>
        <span>{comment.content}</span>
      </div>

    </div>
  );
}
