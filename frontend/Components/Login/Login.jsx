import React, { useState } from "react";
import axios from "axios";
import { FormSVG, Lock } from "../SVG/index";
import Style from "./Login.module.css";
import { Notification } from "../index";
const Login = ({ setNotification, notification, setLogin, setSignup }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState("");

  const handleFormFieldChange = (fieldName, e) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };

  const apiLogin = async (e) => {
    e.preventDefault();

    if (user.email == "" || user.password == "") {
      return setNotification("Please provide email and password");
    }
    setNotification("Please wait, you are being logged in")
    try {
      setLoading("Loading...");
      const response = await axios({
        method: "POST",
        url: `https://d-crowdfunding-backend.onrender.com/api/v1/user/login`,
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });
      if (response.data.status == "success") {
        setNotification("You have been logged successfully");
        localStorage.setItem("NFTApi Token", response.data.token);
        setLogin(false);
        setNotification("");
        window.location.reload();
      } else if (response.data.status == "fail") {
        setNotification(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading("Stopped");
    }
  };

  return (
    <>
      <div className={Style.card}>
        <div className={Style.card2}>
          <form className={Style.form}>
            <p id="heading" className={Style.heading}>
              Login
            </p>
            <div className={Style.field}>
              <FormSVG styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="email"
                autoComplete="off"
                onChange={(e) => handleFormFieldChange("email", e)}
              />
            </div>
            <div className={Style.field}>
              <Lock styleClass={Style.input_icon} />
              <input
                type="text"
                className={Style.input_field}
                placeholder="password"
                onChange={(e) => handleFormFieldChange("password", e)}
              />
            </div>
            <div className={Style.btn}>
              <button className={Style.button1} onClick={() => setLogin(false)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button
                className={Style.button2}
                onClick={() => (setSignup(true), setLogin(false))}
              >
                Sign Up
              </button>
            </div>
            <button className={Style.button3} onClick={(e) => apiLogin(e)}>
              Login
            </button>
          </form>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default Login;
