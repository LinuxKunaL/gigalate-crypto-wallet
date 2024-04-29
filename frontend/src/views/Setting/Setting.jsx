import React from "react";
import { Route, Routes } from "react-router-dom";

import Menu from "./components/Menu";
import Header from "./components/Header";
import General from "./components/General";
import Advanced from "./components/Advanced";
import SecurityPrivacy from "./components/Security&privacy";
import Networks from "./components/Networks";

function Setting() {
  return (
    <div className="flex items-center gap-1 h-full flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="general" element={<General />} />
        <Route path="advanced" element={<Advanced />} />
        <Route path="securityPrivacy" element={<SecurityPrivacy />} />
        <Route path="networks" element={<Networks />} />
      </Routes>
    </div>
  );
}

export default Setting;
