import React, { useState, useEffect } from "react";
import Comment from "./comment-details.component";
import BlogService from "../../services/blog.service";

export default function CommentList({ postId }) {
  const [state, setState] = useState({
    comments: [],
    newCommentEvent: 0,
  });

  useEffect(() => {
    BlogService.getPostComments(postId).then((response) => {
      setState({ ...state, comments: response.data.comments });
    });
  });

  function newCommentCallback() {
    setState({
      ...state,
      newCommentEvent: state.newCommentEvent + 1,
    });
  }

  return (
    <div>
      {state.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
