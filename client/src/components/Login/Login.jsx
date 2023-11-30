import React, { useState } from "react";
import "./Login.css";
import { login } from "../../api/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"

export default function Login() {
    document.title = "login";
  const [validData, setvalidData] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
 
    if (password == "") {
        return "Password is required";
    }

    return "";
  }

  const handleData = (e) => {
        const { name, value } = e.target;
      setData({ ...data, [name]: value });
      if (name == "password") {
        const errorMessage = validatePassword(value);
        setErrors({ ...errors, password: errorMessage });
        setvalidData({ ...validData, password: errorMessage ? "" : value });
      } else {
        setvalidData({ ...validData, [name]: value });
      }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(data);
    setLoading(false);
    if(res.data.status == 200) {
        localStorage.setItem("token", res.data.token)
        window.location.href = "/home"
    } else {
        toast.error(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        })
    }
  }

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red"
  }


  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <picture className="logo">
          <img src="../../../src/assets/cloud.png" alt="cloud image" />
        </picture>
        <form action="" className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-content">
            <div className="auth-title">
              <h1>Login</h1>
            </div>
            <div className="auth-inputs">
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="Email"
                onChange={handleData}
                className="input-auth"
              />
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Password"
                onChange={handleData}
                className={`input-auth ${errors.password ? "error_password" : ""}`}
              />
                {errors.password && (
                    <p className="error-message">{errors.password}</p>
                )}
            </div>
            <button
              className="input-submit"
              disabled={errors.password || loading ? true : false}
            >
              {loading ? <ClipLoader 
                color="#ffffff"
                loading={loading}
                css={override}
                size={15}
              /> : "Login"}
            </button>
          </div>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          </div>
      </div>
    </div>
  );
}
