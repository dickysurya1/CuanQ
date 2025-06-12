import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useAuth } from "../context/AuthContext"; 

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "90vh", width: "100%" }}
    >
      <div>
        <div className="mb-4 text-center">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </div>
        <ul className="nav flex-column">
          {[
            { to: "/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
            { to: "/add-transaction", icon: "fas fa-plus-circle", label: "Add Transaction" },
            { to: "/transaction-history", icon: "fas fa-history", label: "Transaction History" },
            { to: "/future-prediction", icon: "fas fa-magic", label: "Future Prediction" },
          ].map(({ to, icon, label }) => (
            <li className="nav-item mb-2" key={to}>
              <Link
                to={to}
                className={`nav-link rounded ${
                  isActive(to) ? "bg-purple text-white" : "text-purple"
                }`}
              >
                <i className={`${icon} me-2`}></i> {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={handleLogout} className="nav-link text-danger w-100 text-center">
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>
    </div>
  );
}
