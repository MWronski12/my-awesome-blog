import React from "react";

export default function Comment({ comment }) {
  return (
    <div className="my-1">
      {comment && username && (
        <div className="d-flex flex-column">
          <span>
            <span>{username + " "}</span>
            <span className="text-muted">
              {BlogService.formatDate(comment.createdAt)}
            </span>
          </span>
          <span>{comment.content}</span>
        </div>
      )}
    </div>
  );
}
