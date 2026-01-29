// NavBar.jsx
// Shared navigation bar — Appears on all pages
// Demonstrates LO1: React Component Reuse

import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <h1 className="logo">The Interactor</h1>
        <div className="links">
          <Link to="/">Create Post</Link>
          <Link to="/feed">View Feed</Link>
        </div>
      </div>
    </nav>
  );
}
