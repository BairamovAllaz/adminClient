import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AuthStyle/Register.css";
function Register() {
  const [FirstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const SubmitRegister = e => {
    e.preventDefault();
    localStorage.clear();
    setError("");
    const User = {
      firstName: FirstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordverify: passwordVerify,
    };
    const loginUrl = "http://localhost:8100/register/register";
    fetch(loginUrl, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
      method: "POST",
    })
      .then(d => {
        if (!d.ok) {
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
          storeUser(res);
          console.log("ok");
          navigate("/");
        } else {
          storeUser(null);
        }
      })
      .catch(err => {
        console.log("There is something: " + err.message);
      });
  };

  const storeUser = token => {
    localStorage.setItem("token", JSON.stringify(token.token));
    localStorage.setItem("Id", JSON.stringify(token.Id));
  };

  return (
    <div className="mm">
      <div class="mainRegister">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup">
          <form>
            <label for="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="SingUpInput"
              type="text"
              name="FirstName"
              placeholder="FirtsName"
              required=""
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="SingUpInput"
              type="text"
              name="LastName"
              placeholder="LastName"
              required=""
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
            <input
              className="SingUpInput"
              type="email"
              name="Email"
              placeholder="Email"
              required=""
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="SingUpInput"
              type="password"
              name="Password"
              placeholder="Password"
              required=""
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <input
              className="SingUpInput"
              type="password"
              name="PasswordVerify"
              placeholder="PasswordVerify"
              required=""
              onChange={e => {
                setPasswordVerify(e.target.value);
              }}
            />
            <button onClick={SubmitRegister} className="SignUpButton">
              Sign up
            </button>
          </form>
        </div>

        <div class="SignUp">
          <Link className="RegisterLink" to="/Login">
            Have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
