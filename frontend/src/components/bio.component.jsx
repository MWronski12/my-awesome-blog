import React from "react";

export default function Bio() {
  return (
    <div className="my-5">
      <div className="d-flex align-items-center py-3">
        <h1>My Awesome Blog</h1>
        <div className="pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-lightbulb"
            viewBox="0 0 16 16"
          >
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
          </svg>
        </div>
      </div>

      <div className="flex-grow-1">
        <p>
          Simple fullstack programming project showcasing my knowledge of modern
          authentication mechanisms using JWT tokens and creating fullstack CRUD
          applications! Check out the{" "}
          <a href="https://github.com/MWronski12/awesome-blog/" target="_blank">
            source code
          </a>{" "}
          to see how it's built!
        </p>
        <p>
          Following accounts are already created for testing: ("user", "user"),
          ("moderator", "moderator") or ("admin", "admin")
        </p>
      </div>
    </div>
  );
}
