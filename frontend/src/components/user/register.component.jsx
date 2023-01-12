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

export default function Register() {
  // Used for displaying error messages
  const [state, setState] = useState({
    successful: false,
    message: "",
  });

  // Used after successful registration and auto login
  const navigate = useNavigate();
  const [user, setUser] = useGlobalState("user");

  // Form validation hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleRegister({ username, email, password }) {
    setState({
      message: "",
      successful: false,
    });

    AuthService.register(username, email, password)
      // Registration was successful
      .then((response) => {
        setState({
          successful: true,
          message: response.data.message,
        });
      })
      // Login after successful registration
      .then(() => {
        AuthService.login(username, password).then((response) => {
          setUser(response.data.user);
          navigate("/profile");
        });
      })
      // Display error message if registration failed
      .catch((error) => {
        setState({
          successful: false,
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

        <form onSubmit={handleSubmit(handleRegister)}>
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                autoFocus
                className="form-control"
                {...register("username", { required: true, maxLength: 40 })}
              />
              {errors.username && errors.username.type === "required" && (
                <ValidationError message={"This field is required!"} />
              )}
              {errors.username && errors.username.type === "maxLength" && (
                <ValidationError
                  message={"Username must be at most 40 characters long!"}
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                {...register("email", {
                  required: true,
                  maxLength: 40,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <ValidationError message={"This field is required!"} />
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <ValidationError
                  message={"Email must be at most 40 characters long!"}
                />
              )}
              {errors.email && errors.email.type === "pattern" && (
                <ValidationError message={"That is not a valid email!"} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <ValidationError message={"This field is required!"} />
              )}
              {errors.password && errors.password.type === "minLength" && (
                <ValidationError
                  message={"Password must be at least 8 characters long!"}
                />
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <ValidationError
                  message={"Password must be at most 20 characters long!"}
                />
              )}
            </div>

            <div className="form-group mt-3">
              <button className="btn btn-primary btn-block w-100">
                Sign Up
              </button>
            </div>
          </div>

          {state.message && (
            <div className="form-group mt-3">
              <div
                className={
                  state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {state.message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
