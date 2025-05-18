import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-300">
      <div className="flex justify-between flex-row p-3">
        <div>
          <Link to="/">
            <h1 className="font-extrabold">MERN CRUD</h1>
          </Link>
        </div>
        <div className="flex justify-between gap-3">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
          <Link to="/signin">
            <p>SignIn</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
