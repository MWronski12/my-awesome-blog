// React
import React from "react";

// Components
import Bio from "./bio.component";
import PostList from "./post/post-list.component";

export default function Home() {
  return (
    <div className="container">
      <Bio />
      <PostList />
    </div>
  );
}
