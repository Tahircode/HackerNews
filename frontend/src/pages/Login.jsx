import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import "../styles/Login.css"
export const Login = () => {
  const { login, loading, error, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__header">
          <span className="login__brand-y">Y</span>
          <h1 className="login__title">Sign in</h1>
          <p className="login__subtitle">Welcome back to HackerNews</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          {error && <p className="login__error">{error}</p>}

          <div className="login__field">
            <label className="login__label">Email</label>
            <input
              className="login__input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="login__field">
            <label className="login__label">Password</label>
            <input
              className="login__input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="login__btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="login__footer">
          Don't have an account?{" "}
          <Link to="/register" className="login__link">Register</Link>
        </p>
      </div>
    </div>
  );
};
