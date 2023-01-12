// React
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../../store";

// Components
import CommentSection from "../comment/comment-section.component";
import PostListItem from "./post-list-item.component";

// Services
import blogService from "../../services/blog.service";

export default function PostDetails() {
  const { postId } = useParams();
  const [user, setUser] = useGlobalState("user");
  const [state, setState] = useState({ post: null });

  useEffect(() => {
    blogService
      .getPost(postId)
      .then((response) => {
        setState(response.data.post);
      })
      .catch((error) => {
        error.response.message;
      });
  }, []);

  const navigate = useNavigate();

  function onDelete() {
    blogService.deletePost(id).then((response) => {
      navigate("/awesome-blog");
    });
  }

  return (
    <div className="mt-5">
      {user && user.roles.includes("ADMIN") && (
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      )}{" "}
      {state.post && (
        <>
          <PostListItem post={state.post} />
          <CommentSection postId={post.id} />
        </>
      )}
    </div>
  );
}
