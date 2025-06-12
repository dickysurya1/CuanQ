import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import AddTransaction from "../pages/AddTransaction";
import TransactionHistory from "../pages/TransactionHistory";
import FuturePrediction from "../pages/FuturePrediction";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <PrivateRoute>
              <AddTransaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction-history"
          element={
            <PrivateRoute>
              <TransactionHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/future-prediction"
          element={
            <PrivateRoute>
              <FuturePrediction />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
