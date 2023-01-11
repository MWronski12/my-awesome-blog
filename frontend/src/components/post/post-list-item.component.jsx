import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blog.service";

export default function PostListItem({ shortenContent, post }) {
  function formatPostContent(content) {
    if (content.length > 200) {
      return content.slice(0, 200) + " (...)";
    } else {
      return content;
    }
  }

  return (
    <div className="my-3">
      <div className="d-flex flex-column">
        <Link to={`/posts/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
        <span className="text-muted">
          {blogService.formatDate(post.createdAt)}
        </span>
        <span>
          {shortenContent ? formatPostContent(post.content) : post.content}
        </span>
      </div>
    </div>
  );
}
