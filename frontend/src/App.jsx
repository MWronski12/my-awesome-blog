// React
import React from "react";
import { useGlobalState } from "./store";

// React router
import { Routes, Route, Outlet, Link } from "react-router-dom";

// Components
import Home from "./components/home.component";
import Login from "./components/user/login.component";
import Register from "./components/user/register.component";
import Profile from "./components/user/profile.component";
import CreatePost from "./components/post/create-post.component";
import PostDetails from "./components/post/post-details.component";
import AuthVerify from "./common/auth-verify";

// Services
import authService from "./services/auth.service";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        {/* Navbar is the main element always present */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>

      {/* Checks if token didnt expire on each new url */}
      <AuthVerify />
    </>
  );
}

export function Navbar() {
  const [user, setUser] = useGlobalState("user");

  const onLogout = () => {
    authService.logout();
    setUser(null);
  };

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

            {user &&
              (user.roles.includes("MODERATOR") ||
                user.roles.includes("ADMIN")) && (
                <li className="nav-item">
                  <Link to={"/create-post"} className="nav-link">
                    Create post
                  </Link>
                </li>
              )}
          </div>

          {user ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {user.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={onLogout}>
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

      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
}
