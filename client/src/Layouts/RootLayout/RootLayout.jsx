import React from "react";
import { Outlet } from "react-router-dom";
import "./Styles/RootLayout.css";

export default function RootLayout() {
  return (
    <div className="root">
      <Outlet />
    </div>
  );
}
