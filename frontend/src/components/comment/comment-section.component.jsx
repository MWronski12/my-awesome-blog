import React, { useState, useEffect } from "react";

import AddComment from "./add-comment.component";
import CommentList from "./comment-list.component";

export default function CommentSection() {
  const [state, setState] = useState({
    newCommentEvent: 0,
  });

  function newCommentCallback() {
    setState({ newCommentEvent: state.newCommentEvent + 1 });
  }

  return (
    <div className="mb-5">
      <h1>Comments</h1>
      <AddComment
        postId={props.postId}
        newCommentCallback={newCommentCallback}
      />
      <CommentList
        newCommentEvent={state.newCommentEvent}
        postId={props.postId}
      />
    </div>
  );
}
