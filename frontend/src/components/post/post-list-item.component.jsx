import React from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blog.service";

export default function PostListItem({ post, shortenContent }) {
  function formatContent(content) {
    if (content.length > 200) {
      return content.slice(0, 200) + " (...)";
    } else {
      return content;
    }
  }

  return (
    <div className="d-flex flex-column my-3">
      <Link to={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
      </Link>
      <span>{shortenContent ? formatContent(post.content) : post.content}</span>
      <span className="text-muted">
        {post.user.username + " " + blogService.formatDate(post.createdAt)}
      </span>
    </div>
  );
}
