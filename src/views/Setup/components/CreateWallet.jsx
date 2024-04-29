import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Password from "./components/Password";
import SeedPhrase from "./components/SeedPhrase";
import ConfirmSeedPhrase from "./components/ConfirmSeedPhrase";
import Congratulation from "./components/Congratulation";

function CreateWallet() {
  const [password, setPassword] = useState({});
  const [seedPhrase, setSeedPhrase] = useState([]);

  return (
    <Routes>
      <Route index element={<Password props={{ setPassword, password }} />} />
      <Route
        path="seedPhrase"
        element={<SeedPhrase props={{ password, setSeedPhrase, seedPhrase }} />}
      />
      <Route
        path="confirmSeedPhrase"
        element={<ConfirmSeedPhrase props={{ seedPhrase }} />}
      />
      <Route
        path="congratulation"
        element={<Congratulation props={{ password, seedPhrase }} />}
      />
    </Routes>
  );
}

export default CreateWallet;
