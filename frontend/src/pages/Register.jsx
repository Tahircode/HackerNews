import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import "../styles/Register.css"

export const Register = () => {
  const { register, loading, error, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
  };

  return (
    <div className="register">
      <div className="register__card">
        <div className="register__header">
          <span className="register__brand-y">Y</span>
          <h1 className="register__title">Create account</h1>
          <p className="register__subtitle">Join the HackerNews community</p>
        </div>

        <form className="register__form" onSubmit={handleSubmit}>
          {error && <p className="register__error">{error}</p>}

          <div className="register__field">
            <label className="register__label">Name</label>
            <input
              className="register__input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="register__field">
            <label className="register__label">Email</label>
            <input
              className="register__input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="register__field">
            <label className="register__label">Password</label>
            <input
              className="register__input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="register__btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="register__footer">
          Already have an account?{" "}
          <Link to="/login" className="register__link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
