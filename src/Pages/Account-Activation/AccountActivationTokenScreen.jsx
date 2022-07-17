import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import apiURL from "../../config.json";
import "./register.css";

export default function AccountActivationTokenScreen() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const axios = require("axios");

  //Definitions for password validation begin here :

  // RegEx definitions :
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const lengthRegExp = /.{8,20}/;

  const uppercasePassword = uppercaseRegExp.test(inputs.password);
  const lowercasePassword = lowercaseRegExp.test(inputs.password);
  const digitsPassword = digitsRegExp.test(inputs.password);
  const specialCharPassword = specialCharRegExp.test(inputs.password);
  const lengthPassword = lengthRegExp.test(inputs.password);

  let errorMessage = "";

  //RegEx definitions for password validation finish here :

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match !");
    } else {
      axios
        .post(
          `${apiURL.url}/api/activate-user?activationToken=${params.get(
            "activationToken"
          )}&password=${inputs.password}`
        )
        .then((response) => {
          navigate("/home");
        })
        .catch((err) => {
          const message = err.response.data.message.en;
          toast.error(message);
        });
    }
  };

  const handleClickLanguage = (event) => {
    event.preventDefault();
    navigate(`/account-activation-tr?activationToken=${params.get("activationToken")}`);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className="register-form-left">
          <img
            className="register-form-image"
            src="https://i.pinimg.com/564x/b7/5e/a5/b75ea5711edc04b818145f49eb565958.jpg"
            alt=""
          />
        </div>

        <div className="register-form-right">
          <div className="register-form-title">
            <h2 className="title">Activation Account</h2>
          </div>

          <form
            className="register-form-wrapper"
            action="/home"
            onSubmit={handleSubmit}
          >
            <label className="label">Password:</label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              required
              className="input"
              placeholder="Password"
            />

            <label className="label">Confirm your password:</label>
            <input
              name="confirmPassword"
              className="input"
              type="password"
              placeholder="Confirm Password"
              value={inputs.confirmPassword || ""}
              onChange={handleChange}
              required
            />

            <button className="register-form-button" type="submit">
              Register
            </button>

            <p className="have-account">
              Already have an account?
              <span>
                <Link to="/login" className="login">
                  Log in
                </Link>
              </span>
            </p>

            <a
              className="language"
              onClick={handleClickLanguage}
            >
              <em>Türkçe ziyaret edin</em>
            </a>

          </form>
        </div>
      </div>
    </div>
  );
}
