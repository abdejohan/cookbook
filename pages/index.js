import React, { useContext, useEffect } from "react";
import axios from "axios";
import Home from "../components/Home";
import UserContext from "../context/UserContext";

const App = () => {
  const { setUserData } = useContext(UserContext);

  // if (typeof window !== "undefined") {
  //   localStorage.setItem(key, value);
  // }
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({ token, user: userRes.data });
      }
    };
    checkLoggedIn();
  }, [setUserData]);

  return <Home />;
};

export default App;
