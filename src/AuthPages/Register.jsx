import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AuthStyle/Register.css";
function Register() {
  const [FirstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const SubmitRegister = e => {
    e.preventDefault();
    localStorage.clear();
    const User = {
      firstName: FirstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordverify: passwordVerify,
    };
    const loginUrl = "https://admin-allaz.herokuapp.com/register/register";
    fetch(loginUrl, {
      credentials: "same-origin",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
      method: "POST",
    })
      .then(d => {
        if (!d.ok) {
          throw d;
        }
        return d.json();
      })
      .then(res => {
        storeUser(res);
        navigate("/");
      })
      .catch(err => {
        err.text().then(errorMessage => {
          alert(errorMessage);
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPasswordVerify("");
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
              value={FirstName}
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
              value={lastName}
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
              value={email}
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
              value={password}
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
              value={passwordVerify}
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
