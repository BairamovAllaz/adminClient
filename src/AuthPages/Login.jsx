import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./AuthStyle/Login.css";
import { useAsyncDebounce } from "react-table";
axios.defaults.withCredentials = true;
function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const storeUser = token => {
    localStorage.setItem("Id", JSON.stringify(token.Id));
    localStorage.setItem("token", JSON.stringify(token.token));
  };
  const LoginTo = e => {
    e.preventDefault();
    localStorage.clear();
    const user = {
      email: email,
      password: password,
    };
    const loginUrl = "https://admin-allaz.herokuapp.com/register/login";
    fetch(loginUrl, {
      credentials: "same-origin",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      method: "POST",
    })
      .then(d => {
        if (!d.ok) {
          throw d;
        }
      })
      .then(res => {
        storeUser(res);
        navigate("/");
      })
      .catch(err => {
        err.text().then(errorMessage => {
          alert(errorMessage);
        });
        setemail("");
        setpassword("");
      });
  };

  return (
    <div class="MainWindow">
      <div class="mainLogin">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div class="signup">
          <form>
            <label for="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              required=""
              className="LoginInput"
              onChange={e => {
                setemail(e.target.value);
              }}
              value = {email}
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              required=""
              className="LoginInput"
              onChange={e => {
                setpassword(e.target.value);
              }}
              value = {password}
            />
            <button onClick={LoginTo} className="loginButton">
              Login
            </button>
          </form>
        </div>

        <div class="login">
          <Link className="loginLink" to="/Register">
            Dont have any account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
