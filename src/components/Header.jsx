import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

import classes from "./Header.module.css";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  return state.userId ? (
    <header className={classes.header}>
      <ul className={classes["header-nav"]}>
        <li>
          <NavLink to="/">My Home</NavLink>
        </li>
        <li>
          <NavLink to={`${state.userId ? "bookings" : "/"}`}>Bookings</NavLink>
        </li>
        <li>
          <NavLink to={`${state.userId ? "reviews" : "/"}`}>Reviews</NavLink>
        </li>
        <li>
          {state.userId && (
            <button
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                navigate("/");
              }}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </header>
  ) : (
    <>
      <header className={classes.header}>
        <ul className={classes["header-nav"]}>
          <li>
            <NavLink to="/">🌉 Welcome to Golden Gate Cookie Co. 🍪</NavLink>
          </li>
        </ul>
      </header>
      <Auth />
      <Home />
    </>
  );
};

export default Header;
