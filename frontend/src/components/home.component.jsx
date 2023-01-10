import React, { Component } from "react";

import Bio from "./bio.component";
import PostList from "./post/post-list.component";

export default function Home() {
  return (
    <div className="container">
      <div>This is home!</div>
      <Bio />
      <PostList />
    </div>
  );
}
