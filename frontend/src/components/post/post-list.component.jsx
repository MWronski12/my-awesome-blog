import React, { useState, useEffect } from "react";
import PostListItem from "./post-list-item.component";
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
        <PostListItem shortenContent={true} key={post.id} post={post} />
      ))}
    </div>
  );
}
