import React, { useState, useContext } from "react";
import axios from "axios";

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
        console.log(res.data);
        dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch((err) => {
        console.log(err).response.data;
      });
  };

  return (
    <section className={classes["auth-form-container"]}>
      <form onSubmit={handleSubmit}>
        <h1>Please {!register ? "login" : "register"} below</h1>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setRegister(!register)}>
        Want to {register ? "Login" : "Register"}?
      </button>
    </section>
  );
};

export default Auth;
