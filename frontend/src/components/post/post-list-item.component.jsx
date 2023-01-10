import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blog.service";

export default function PostListItem() {
  const [state, setState] = useState({ post: {} });

  useEffect(() => {
    setState({ post: {} });
  });

  function formatPostContent(content) {
    if (content.length > 200) {
      return content.slice(0, 200) + " (...)";
    } else {
      return content;
    }
  }

  return (
    <div className="my-3">
      {state.post && (
        <div className="d-flex flex-column">
          <Link to={`/awesome-blog/posts/${state.post.id}`}>
            <h1>{state.post.title}</h1>
          </Link>
          <span className="text-muted">
            {blogService.formatDate(state.post.createdAt)}
          </span>
          <span>
            {this.props.shortenContent
              ? this.formatPostContent(state.post.content)
              : state.post.content}
          </span>
        </div>
      )}
    </div>
  );
}
