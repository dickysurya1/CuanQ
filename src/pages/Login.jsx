import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import gLogo from "../assets/img/google-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginService(form);
      toast.success(res.data.data.message || "Login berhasil");
      login(res.data.data.user);

      if (res.data.data.user.access_token) {
        localStorage.setItem("token", res.data.data.user.access_token);
      }

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center auth-container">
      <div className="row w-100" style={{ maxWidth: "900px" }}>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <div className="text-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-50" />
            </Link>
          </div>
          <div className="text-center mt-4">
            <h4 className="mb-2">Sign In</h4>
            <p className="mb-4">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn-purple w-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="mt-3 text-center">
            <button className="google-btn">
              <img
                src={gLogo}
                alt="Google"
                width="32"
                style={{ cursor: "pointer" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
