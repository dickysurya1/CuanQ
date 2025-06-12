import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;
  const sidebarWidth = 250;

  return (
    <>
      {!isDesktop && (
        <nav className="navbar navbar-light bg-white border-bottom d-md-none">
          <div className="container-fluid">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
      )}

      <div className="d-flex">
        <div
          className={`bg-white border-end p-3 overflow-auto ${
            sidebarOpen || isDesktop ? "d-block" : "d-none"
          }`}
          style={{
            width: sidebarWidth,
            height: "100vh",
            position: isDesktop ? "fixed" : "fixed",
            top: 0,
            left: 0,
            zIndex: 1045,
          }}
          onClick={() => {
            if (!isDesktop) setSidebarOpen(false);
          }}
        >
          <Sidebar />
        </div>

        <main
          className="flex-grow-1 p-3 bg-light"
          style={{
            minHeight: "100vh",
            marginLeft: isDesktop ? sidebarWidth : 0,
            width: isDesktop ? `calc(100% - ${sidebarWidth}px)` : "100%",
            transition: "margin-left 0.3s ease, width 0.3s ease",
            overflowX: "hidden",
          }}
        >
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>

      {!isDesktop && sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
