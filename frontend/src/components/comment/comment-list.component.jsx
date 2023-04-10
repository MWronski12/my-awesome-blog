// React
import React, { useState, useEffect } from "react";

// Components
import CommentDetails from "./comment-details.component";
import CreateComment from "./create-comment.component";

// Services
import BlogService from "../../services/blog.service";
import blogService from "../../services/blog.service";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const newCommentCallback = (comment) => {
    setComments([...comments, comment])
  };

  const deleteCommentCallback = (comment) => {
    setComments(comments.filter((c) => c.id !== comment.id));
  };

  useEffect(() => {
    BlogService.getPostComments(postId)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  }, []);

  return (
    <div className="mb-5">
      <CreateComment
        postId={postId}
        newCommentCallback={newCommentCallback}
      />
      {comments.length != 0 && <h1>Comments:</h1>}
      {comments.map((comment) => (
        <CommentDetails
          key={comment.id}
          comment={comment}
          deleteCommentCallback={deleteCommentCallback}
        />
      ))}
    </div>
  );
}
