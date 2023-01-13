import React, { useState, useEffect } from "react";
import CreateComment from "./create-comment.component";
import CommentDetails from "./comment-details.component";
import BlogService from "../../services/blog.service";

export default function CommentList({ postId }) {
  const [state, setState] = useState({ comments: [], newCommentEvent: 0 });

  const newCommentCallback = () => {
    setState({ ...state, newCommentEvent: state.newCommentEvent++ });
  };

  useEffect(() => {
    BlogService.getPostComments(postId)
      .then((response) => {
        setState({ comments: response.data.comments });
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  }, [state.newCommentEvent]);

  return (
    <div>
      <CreateComment postId={postId} newCommentCallback={newCommentCallback} />
      {state.comments.map((comment) => (
        <CommentDetails key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
