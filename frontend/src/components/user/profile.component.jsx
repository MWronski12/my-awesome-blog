import React from "react";
import authService from "../../services/auth.service";
import { useGlobalState } from "../../store";

export default function Profile() {
  const [user, setUser] = useGlobalState("user");

  return (
    <div className="container text-break">
      {user ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{user.username}</strong> profile
            </h3>
          </header>
          <p>
            <strong>JWT Token:</strong> {authService.getToken()}
          </p>
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {user.roles &&
              user.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
