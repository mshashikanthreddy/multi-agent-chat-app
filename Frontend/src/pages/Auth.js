import { useState } from "react";
import api from "../api/axios";

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
      const payload = { emailId, password };

      const res = await api.post(url, payload);

      // store JWT
      sessionStorage.setItem("token", res.data.token);

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {isLogin ? "No account?" : "Already have an account?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
