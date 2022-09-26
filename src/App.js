import "./App.css";
import Login from "./AuthPages/Login";
import Register from "./AuthPages/Register";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Navigate,
  Route,
  Switch,
} from "react-router-dom";
import React from "react";
import Home from "./Home";
import { PrivateRoute } from "./AuthPages/privateRoute";

//this line enables to use connect to server with axios
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
