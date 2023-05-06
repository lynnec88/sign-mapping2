import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    "email" in localStorage ? true : false
  );
  const navigate = useNavigate();
  const location = useLocation();
  const paths = ["/", "/about", "/login", "/register"];
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!isLoggedIn && !paths.includes(location.pathname)) {
    alert("You need to be logged in to access this page");
    navigate("/login");
  }

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={"/"}>
        <h2 style={{ lineHeight: "40px" }}>
          <div className="logo"></div>
          ASL Mapping
        </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav">
          {isLoggedIn && (
            <>
            <li className="nav-item">
              <Link className="nav-link" to={"category"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"quizzes"}>
                Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"scores"}>
                Records
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"regional/1"}>
                Map
              </Link>
            </li>
            </>
          )}
          <li className="nav-item">
              <Link className="nav-link" to={"about"}>
                About
              </Link>
            </li>
          {isLoggedIn ? (
            <button className="register" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
            <div>
              <Link to={"login"}>
                <button className="login">Log In</button>
              </Link>
              {/* <Link to={"register"}>
                <button className="register">Get started for free</button>
              </Link> */}
            </div>
            </>
          )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
