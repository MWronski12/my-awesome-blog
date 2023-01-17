// React
import React from "react";
import { Link } from "react-router-dom";

// Services
import blogService from "../../services/blog.service";

export default function PostListItem({ post, shortenContent }) {
  return (
    <div className="d-flex flex-column my-3">
      <h1 className="mb-4">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h1>
      <FormattedContent
        content={post.content}
        shortenContent={shortenContent}
      />
      <span className="text-muted">
        {post.user.username + " " + blogService.formatDate(post.createdAt)}
      </span>
    </div>
  );
}

function FormattedContent({ content, shortenContent }) {
  if (shortenContent && content.length > 200) {
    return content.slice(0, 200) + " (...)";
  }
  content = content
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  return <div>{content}</div>;
}
