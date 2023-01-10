import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function Profile() {
  const [state, setState] = useState({
    redirect: null,
    userReady: false,
    currentUser: { username: "" },
  });

  useEffect(() => {
    setState({ ...state, currentUser: AuthService.getCurrentUser() });

    if (state.currentUser) {
      setState({ ...state, redirect: "/awesome-blog/home" });
    }
  });

  if (state.redirect) {
    return <Redirect to={state.redirect} />;
  }

  return (
    <div className="container">
      {state.userReady ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{state.currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong>{" "}
            {state.currentUser.accessToken.substring(0, 20)} ...{" "}
            {state.currentUser.accessToken.substr(
              state.currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Id:</strong> {state.currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {state.currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {state.currentUser.roles &&
              state.currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
