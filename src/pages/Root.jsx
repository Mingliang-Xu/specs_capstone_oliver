import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Auth from "./Auth";
import AuthContext from "../store/AuthContext";

import classes from "./Root.module.css";

const Root = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <header>
      <Header />
      {!state.userId && <Auth />}
      <Outlet />
    </header>
  );
};
export default Root;
