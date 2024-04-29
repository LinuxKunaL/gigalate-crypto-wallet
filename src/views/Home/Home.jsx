import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SendCrypto from "./components/SendCrypto";
import ReceiveCrypto from "./components/ReceiveCrypto";

function Home() {
  return (
    <div className="relative h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="send" element={<SendCrypto />} />
        <Route path="receive" element={<ReceiveCrypto />} />
      </Routes>
    </div>
  );
}

export default Home;
