import React, { useState } from "react";
import { Form } from "react-validation/build";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";
import eventBus from "../../common/EventBus";

function required(value) {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
    loading: false,
    message: "",
  });

  function onChangeUsername(e) {
    setState({
      username: e.target.value,
    });
  }

  function onChangePassword(e) {
    setState({
      password: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    setState({
      message: "",
      loading: true,
    });

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.login(state.username, state.password).then(
        () => {
          props.history.push("/awesome-blog/profile");
          eventBus.dispatch("login");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      setState({
        loading: false,
      });
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form
          onSubmit={handleLogin}
          ref={(c) => {
            form = c;
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={state.username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={state.password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={state.loading}
            >
              {state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              checkBtn = c;
            }}
          />
        </Form>
      </div>
    </div>
  );
}
