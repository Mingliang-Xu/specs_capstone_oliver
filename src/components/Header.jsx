import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

import classes from "./Header.module.css";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  return state.userId ? (
    <header className={classes.header}>
      <ul className={classes["header-nav"]}>
        <li>
          <NavLink to="/">My Home Page</NavLink>
        </li>
        <li>
          <NavLink to={`${state.userId ? "/bookings" : "/"}`}>
            Booking Page
          </NavLink>
        </li>
        <li>
          <NavLink to={`${state.userId ? "/reviews" : "/"}`}>
            Review Page
          </NavLink>
        </li>
      </ul>
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
    </header>
  ) : (
    <header className={classes.header}>
      <ul className={classes["header-nav"]}>
        <li>
          <NavLink to="/">Welcome to My Page</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;