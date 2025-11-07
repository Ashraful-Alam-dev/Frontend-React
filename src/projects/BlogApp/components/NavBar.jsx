import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="welcome">Welcome</h2>
      <div className="nav-links">
        <Link to="/blog">Home</Link>
        <a href = "https://www.facebook.com/ashraful.alam.931253/">Contact</a>
        <Link to = "/blog/about">About Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;
