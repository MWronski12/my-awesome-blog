// React
import React from "react";

// Home page project description
export default function Bio() {
  return (
    <div className="my-5">
      <div className="d-flex align-items-center py-3">
        <h1>My Awesome Blog</h1>
        <div className="pl-3"></div>
      </div>

      <div className="flex-grow-1">
        <p>
          Simple project showcasing my knowledge of authentication mechanisms
          using JWT tokens and creating fullstack CRUD applications! Check out
          the{" "}
          <a class="font-weight-bold" href="https://github.com/MWronski12/my-awesome-blog/" target="_blank">
            source code
          </a>{" "}
          to see how it's built!
        </p>
        <p>
          Following accounts are already created for testing: ("user", "user")
          and ("admin", "admin")
        </p>
      </div>
    </div>
  );
}
