// React
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobalState } from "../../store";
import { useNavigate } from "react-router-dom";

// Services
import AuthService from "../../services/auth.service";

// Common
import ValidationError from "../../common/validation-error";

export default function Login() {
  // Used for displaying error messages
  const [state, setState] = useState({
    loading: false,
    message: "",
  });

  // Used after successful login
  const navigate = useNavigate();
  const [user, setUser] = useGlobalState("user");

  // Form validation hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fom validation config
  const validationConfig = {
    username: {
      required: "Username is required!",
    },
    email: {
      required: "Email is required!",
    },
    password: {
      required: "Password is required!",
    },
  };

  function handleLogin({ username, password }) {
    setState({
      message: "",
      loading: true,
    });

    AuthService.login(username, password)
      // Login was successful
      .then((response) => {
        setUser(response.data.user);
        navigate("/profile");
      })
      // Display error message if failed
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
              autoFocus
              className="form-control"
              {...register("username", validationConfig.username)}
            />
            {errors?.username && (
              <ValidationError message={errors.username.message} />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              {...register("password", validationConfig.password)}
            />
            {errors?.password && (
              <ValidationError message={errors.password.message} />
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
