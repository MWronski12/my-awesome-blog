// React
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../../store";

// Components
import CommentList from "../comment/comment-list.component";

// Services
import blogService from "../../services/blog.service";
import authService from "../../services/auth.service";
import PostListItem from "./post-list-item.component";

export default function PostDetails() {
  const { postId } = useParams();
  const [user, setUser] = useGlobalState("user");
  const [state, setState] = useState({ post: null });

  useEffect(() => {
    blogService
      .getPost(postId)
      .then((response) => {
        setState({ post: response.data.post });
      })
      .catch((error) => {
        error.response.message;
      });
  }, []);

  const navigate = useNavigate();

  function onDelete() {
    blogService.deletePost(state.post.id).then((response) => {
      navigate("/awesome-blog");
    });
  }

  return (
    <div className="mt-5">
      {authService.isAdminOrModerator(user) && (
        <button className="btn btn-danger" onClick={onDelete}>
          Delete Post
        </button>
      )}
      {state.post && (
        <div>
          <PostListItem post={state.post} shortenContent={false} />
          <CommentList postId={state.post.id} />
        </div>
      )}
    </div>
  );
}
