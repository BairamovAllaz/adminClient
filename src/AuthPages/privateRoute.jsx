import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import Home from "../Home";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export { PrivateRoute };
function PrivateRoute({ children }) {
  const [isAuth, setisAuth] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      setisAuth(true);
      navigate("/");
    } else {
      setisAuth(false);
      navigate("/login");
    }
  }, []);
  return isAuth ? <Home /> : <Navigate to="/Login" />;
}

export default PrivateRoute;
