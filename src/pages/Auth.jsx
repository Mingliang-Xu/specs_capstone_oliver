import React, { useState, useContext } from "react";
import axios from "axios";

import About from "../components/About";

import AuthContext from "../store/AuthContext";

import classes from "./Auth.module.css";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/${!register ? "login" : "register"}`, {
        username,
        password,
      })
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch((err) => {
        window.alert(err.response.data);
        console.log(err).response.data;
      });
  };

  return (
    <main className={classes.auth}>
      <section className={classes["auth-form-container"]}>
        <form onSubmit={handleSubmit}>
          <h1>Please {!register ? "Login" : "Register"}</h1>
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button type="submit">{!register ? "Login" : "Register"}</button>
        </form>
        <button onClick={() => setRegister(!register)}>
          Want to {register ? "Login" : "Register"}?
        </button>
      </section>
      <About />
    </main>
  );
};

export default Auth;
