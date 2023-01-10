import React, { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/home.component";

// import AuthService from "./services/auth.service";

// import Login from "./components/user/login.component";
// import Register from "./components/user/register.component";
// import Profile from "./components/user/profile.component";
// import CreatePost from "./components/post/create-post.component";

// import AuthVerify from "./common/auth-verify";
// import EventBus from "./common/EventBus";
// import PostDetails from "./components/post/post-details.component";

// this.state = {
//   currentUser: undefined,
//   showAdminContent: false,
// };

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetails />} /> */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export function Navbar() {
  const [state, setState] = useState({
    showAdminContent: false,
    currentUser: null,
  });

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {state.showAdminContent && (
              <li className="nav-item">
                <Link to={"/create-post"} className="nav-link">
                  Create post
                </Link>
              </li>
            )}
          </div>

          {state.currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {state.currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                  LogOut
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>

      <div className="container mt-3"></div>

      {/* <AuthVerify logOut={this.logOut} /> */}
    </div>
  );
}
