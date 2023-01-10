import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import authService from "../../services/auth.service";
import blogService from "../../services/blog.service";
import CommentSection from "../comment/comment-section.component";
import PostListItem from "./post-list-item.component";

function PostDetails(props) {
  const [state, setState] = useState({ showAdminContent: false });

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setState({
        showAdminContent: user.roles.includes("ROLE_ADMIN"),
      });
    }
  });

  function onDelete() {
    blogService.deletePost(props.postId).then((response) => {
      props.history.push("/awesome-blog");
    });
  }

  return (
    <div className="mt-5">
      {state.showAdminContent && (
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      )}
      <PostListItem postId={props.postId} />
      <CommentSection postId={props.postId} />
    </div>
  );
}

export default withRouter(PostDetails);
