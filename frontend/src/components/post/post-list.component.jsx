// React
import React, { useState, useEffect } from "react";

// Components
import PostListItem from "./post-list-item.component";

// Services
import blogService from "../../services/blog.service";

export default function PostList() {
  const [state, setState] = useState({ posts: [] });

  useEffect(() => {
    blogService
      .getAllPosts()
      .then((response) => {
        setState({ posts: response.data.posts });
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  }, []);

  return (
    <div className="mb-5">
      {state.posts.map((post) => (
        <PostListItem key={post.id} post={post} shortenContent={true} />
      ))}
    </div>
  );
}
