import React, { useState, useEffect } from "react";
import Comment from "./comment.component";
import BlogService from "../../services/blog.service";

export default function CommentList() {
  const [state, setState] = useState({
    comments: [],
    newCommentEvent: 0,
  });

  useEffect(() => {
    BlogService.getPostComments(props.postId).then((response) => {
      setState({ ...state, comments: response.data });
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
        <Comment key={comment.id} id={comment.id} />
      ))}
    </div>
  );
}
