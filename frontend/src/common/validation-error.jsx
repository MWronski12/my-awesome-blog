import React from "react";

export default function ValidationError({ message }) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}
