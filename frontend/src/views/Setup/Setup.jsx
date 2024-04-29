import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import CreateWallet from "./components/CreateWallet";
import ImportWallet from "./components/ImportWallet";

function Setup() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="createWallet" element={<CreateWallet />}>
        <Route path="seedPhrase" />
        <Route path="confirmSeedPhrase" />
        <Route path="congratulation" />
      </Route>
      <Route path="importWallet" element={<ImportWallet />} />
    </Routes>
  );
}

export default Setup;
