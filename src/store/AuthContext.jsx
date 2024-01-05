import React from "react";

import { createContext, useReducer, useEffect } from "react";

const initialState = {
  username: null,
  userId: null,
  token: null,
  exp: null,
};
const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const getLocalData = () => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    const storedExp = localStorage.getItem("exp");
    let remainingExp = storedExp - new Date().getTime();
    if (remainingExp < 0) {
      localStorage.clear();
      return null;
    }
    return {
      username: storedUsername,
      userId: storedUserId,
      token: storedToken,
      exp: storedExp,
    };
  };

  useEffect(() => {
    let localData = getLocalData();
    if (localData) {
      dispatch({ type: "LOGIN", payload: localData });
    }
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        const { username, userId, token, exp } = action.payload;
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("exp", exp);
        return { ...state, username, userId, token, exp };
      case "LOGOUT":
        localStorage.clear();
        return initialState;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
