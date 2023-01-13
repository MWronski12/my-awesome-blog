import React from "react";
import blogService from "../../services/blog.service";
import authService from "../../services/auth.service";
import { useGlobalState } from "../../store";

export default function CommentDetails({ comment }) {
  const [user, setUser] = useGlobalState("user");

  return (
    <div className="my-1">
      {user && user.username && (
        <div className="d-flex flex-column">
          <span>
            <span>{}</span>
            <span className="text-muted">
              {comment.user.username +
                " " +
                blogService.formatDate(comment.createdAt)}
            </span>
          </span>
          <span>{comment.content}</span>
        </div>
      )}
    </div>
  );
}
