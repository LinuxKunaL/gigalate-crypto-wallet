import React, { useState } from "react";
import logo from "../../assets/images/Logo.svg";
import Button from "../../components/ui/Button.jsx";
import { Link } from "react-router-dom";
import { toastError, toastSuccess, Toaster } from "../../app/Toasts.js";
import { decryption } from "../../functions/encryption.js";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Loader from "../../components/ui/Loader.jsx";

function Lock() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleUnlock = () => {
    setLoading(true);

    if (password.length === 0) {
      return toastError("Enter password");
    }

    const seedEncrypted = localStorage.getItem("gigalate.seedEncrypted");

    if (seedEncrypted) {
      const seedDecrypted = decryption(seedEncrypted, password);

      if (seedDecrypted.success) {
        toastSuccess("Wallet unlock !");

        Cookies.set("gigalate.key", password, { expires: 1 / 24 });

        setTimeout(() => {
          return Navigate("/home");
        }, 1500);
      }
      if (!seedDecrypted.success) {
        setLoading(false);
        return toastError(seedDecrypted.data);
      }
    } else {
      return Navigate("/");
    }
  };

  return (
    <>
      {loading ? <Loader variant="primary" /> : null}
      <div className="h-full w-full flex gap-5 flex-col justify-center p-4">
        <Toaster position="top" />
        <div className="flex flex-col gap-2 items-center">
          <img className="w-12" src={logo} alt="" />
          <h1 className="text-2xl bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text drop-shadow-lg ">
            gigalate
          </h1>
          <p className="text-lg font-semibold text-onyx-200">Welcome back !</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" onClick={handleUnlock}>
            Unlock
          </Button>
        </div>
        <Link
          to="/forgotPassword"
          className="text-sm text-center text-indigo-500 font-semibold hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </>
  );
}

export default Lock;
