import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";

import Splash from "./views/Splash/Splash";
import Setup from "./views/Setup/Setup";
import Home from "./views/Home/Home";
import Setting from "./views/Setting/Setting";
import Lock from "./views/Lock/Lock";
import ForgotPassword from "./views/Lock/ForgotPassword";

function App() {
  return (
    // <div className="bg-onyx-900 shadow-massive-2 relative h-full w-full xs:h-[37pc] xs:w-[22pc] flex flex-col overflow-hidden border-blue-500d border-onyx-600 border-[1px]d rounded-xl.">
    <div className="bg-onyx-900 shadow-massive-2 relative h-[37pc] w-[22pc] flex flex-col overflow-hidden border-blue-500d border-onyx-600 border-[1px]d rounded-xl.">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="setup" element={<Setup />}>
            <Route path="createWallet">
              <Route path="seedPhrase" />
              <Route path="confirmSeedPhrase" />
              <Route path="congratulation" />
            </Route>
            <Route path="importWallet" />
          </Route>
          <Route path="home" element={<Home />}>
            <Route path="send" />
            <Route path="receive" />
          </Route>
          <Route path="setting" element={<Setting />}>
            <Route path="general" />
            <Route path="advanced" />
            <Route path="securityPrivacy" />
            <Route path="contacts" />
            <Route path="networks" />
          </Route>
          <Route path="lock" element={<Lock />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}
export default App;
