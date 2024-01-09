import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import AuthContext from "../store/AuthContext";

const Root = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Outlet />
      <img src="/public/cookie.png" id="cookie-animate"></img>
    </>
  );
};
export default Root;
