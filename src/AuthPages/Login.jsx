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
  const [error, setError] = useState("");

  const storeUser = token => {
    localStorage.setItem("Id", JSON.stringify(token.Id));
    localStorage.setItem("token", JSON.stringify(token.token));
  };
  const LoginTo = e => {
    e.preventDefault();
    localStorage.clear();
    setError("");
    const user = {
      email: email,
      password: password,
    };
    const loginUrl = "http://localhost:8100/register/login";
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
        if(!d.ok){
        console.log(
          "From server: " +
          d.text().then(text => {
            console.log(text);
            alert(text);
            setError(text);
          })
          );
        }
          return d.json();
      })
      .then(res => {
        if (error === "") {
          console.log(res);
          storeUser(res);
          console.log("ok");
          navigate("/");
        }else{ 
          storeUser(null);
        }
      })
      .catch(err => {
        console.log(err);
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
