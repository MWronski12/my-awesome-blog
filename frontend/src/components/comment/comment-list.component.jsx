// React
import React, { useState, useEffect } from "react";

// Components
import CommentDetails from "./comment-details.component";
import CreateComment from "./create-comment.component";

// Services
import BlogService from "../../services/blog.service";

export default function CommentList({ postId }) {
  const [state, setState] = useState({ comments: [], newCommentEvent: 0 });

  const newCommentEventCallback = () => {
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
    <div className="mb-5">
      <CreateComment
        postId={postId}
        newCommentEventCallback={newCommentEventCallback}
      />
      {state.comments.length !== 0 && <h1>Comments:</h1>}
      {state.comments.map((comment) => (
        <CommentDetails
          key={comment.id}
          comment={comment}
          newCommentEventCallback={newCommentEventCallback}
        />
      ))}
    </div>
  );
}
