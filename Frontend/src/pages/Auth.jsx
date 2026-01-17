import React from 'react';
import { useState } from "react";
import api from "../api/axios";
import './Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailId || !password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin && !name) {
    setError("Name is required");
    return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = isLogin ? "/auth/login" : "/auth/signup";
      const signupPayload = { name ,emailId, password };
      const loginPayload = {emailId , password};
      const payload = isLogin ? loginPayload : signupPayload ;

      const res = await api.post(url, payload);

      // store JWT
      sessionStorage.setItem("token", res.data.token);

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.error || "Invalid Credentials");
      setPassword("");
      setConfirmPassword("");
      setEmailId("");
      setName("");
    }

  };

  return (
    <div className="auth-page">
  <div className="auth-card">
    <h2>{isLogin ? "Login" : "Create account"}</h2>
    <p className="auth-subtitle">
      {isLogin
        ? "Sign in to continue"
        : "Create an account to get started"}
    </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
            }
          }
        />
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
        }}
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setError("");
            }
          }
          />
        )}

        {error && <p className="auth-error" >{error}</p>}

        <button type="submit">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p className='auth-footer'>
        {isLogin ? "No account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
    </div>
  );
}

export default Auth;
