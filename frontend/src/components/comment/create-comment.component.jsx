// React
import React from "react";
import { useGlobalState } from "../../store";
import { useForm } from "react-hook-form";

// Services
import blogService from "../../services/blog.service";

// Common
import ValidationError from "../../common/validation-error";

export default function CreateComment({ postId, newCommentEventCallback }) {
  const [user, setUser] = useGlobalState("user");

  // Form validation hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fom validation config
  const validationConfig = {
    comment: {
      required: "Cannot post an empty comment!",
    },
  };

  function onSubmit({ comment }) {
    blogService
      .createComment({
        userId: user.id,
        postId: postId,
        content: comment,
      })
      .then((response) => {
        newCommentEventCallback();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    reset();
  }

  return (
    <div>
      {user && (
        <form
          className="w-100 my-3 d-flex flex-column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="comment" className="form-label">
            <h5>Add Comment:</h5>
          </label>
          <span className="d-flex">
            <input
              className="form-control flex-grow-1"
              {...register("comment", validationConfig.comment)}
            />
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </span>
          {errors?.comment && (
            <ValidationError message={errors.comment.message} />
          )}
        </form>
      )}
    </div>
  );
}
