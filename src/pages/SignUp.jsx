import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import gLogo from "../assets/img/google-logo.png";
import { Link } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      toast.success(res.data.message); // ✅ Toast sukses
    } catch (err) {
      toast.error(err.response?.data?.message || "Terjadi kesalahan"); // ❌ Toast error
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
            <h4 className="mb-2">Sign Up</h4>
            <p className="mb-4">
              Already have an account? <Link to="/login">Sign In</Link>.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn-purple w-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
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

export default SignUp;
