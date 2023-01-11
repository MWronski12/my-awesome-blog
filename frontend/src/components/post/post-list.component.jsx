import React, { useState, useEffect } from "react";
import PostListItem from "./post-list-item.component";
import blogService from "../../services/blog.service";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    blogService
      .getAllPosts()
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  }, []);

  return (
    <div className="mb-5">
      {posts.map((post) => (
        <PostListItem shortenContent={true} key={post.id} post={post} />
      ))}
    </div>
  );
}
