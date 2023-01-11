import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store";

import AuthService from "../../services/auth.service";

function ValidationError({ message }) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}

export default function Login() {
  const [user, setUser] = useGlobalState("user");

  const [state, setState] = useState({
    loading: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleLogin({ username, password }) {
    setState({
      message: "",
      loading: true,
    });

    AuthService.login(username, password)
      .then((user) => {
        setUser(user);
        navigate("/profile");
      })
      .catch((error) => {
        setState({
          loading: false,
          message: error.response.data.message,
        });
      });
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              {...register("username", { required: true })}
            />
            {errors.username && errors.username.type === "required" && (
              <ValidationError message={"This field is required!"} />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <ValidationError message={"This field is required!"} />
            )}
          </div>

          <div className="form-group mt-3">
            <button
              className="btn btn-primary btn-block w-100"
              disabled={state.loading}
            >
              {state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {state.message && (
            <div className="form-group mt-3">
              <div className="alert alert-danger" role="alert">
                {state.message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
