// React
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store";

// Services
import AuthService from "../../services/auth.service";

// Common
import ValidationError from "../../common/validation-error";

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

  // Fom validation config
  const validationConfig = {
    username: {
      required: "Username is required!",
    },
    email: {
      required: "Email is required!",
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "That is not a valid email address!",
      },
    },
    password: {
      required: "Password is required!",
      pattern: {
        value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        message:
          "Password has to contain at least one number and a special character [!@#$%^&*]",
      },
      minLength: {
        value: 8,
        message: "Password has to be at least 8 characters long!",
      },
    },
  };

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
                {...register("username", validationConfig.username)}
              />
              {errors?.username && (
                <ValidationError message={errors.username.message} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                {...register("email", validationConfig.email)}
              />
              {errors?.email && (
                <ValidationError message={errors.email.message} />
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
