import React, { useState, useEffect } from "react";
import { useNavigate, withRouter } from "react-router-dom";

import blogService from "../../services/blog.service";
import { useGlobalState } from "../../store";
import CommentSection from "../comment/comment-section.component";
import PostListItem from "./post-list-item.component";

function PostDetails({ id }) {
  const [user] = useGlobalState("user");

  const navigate = useNavigate();

  function onDelete() {
    blogService.deletePost(id).then((response) => {
      navigate("/awesome-blog");
    });
  }

  return (
    <div className="mt-5">
      {user &&
        user.roles.includes("ADMIN")(
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        )}
      <PostListItem postId={id} />
      <CommentSection postId={id} />
    </div>
  );
}

export default withRouter(PostDetails);
