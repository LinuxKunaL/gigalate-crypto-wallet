import React, { useState } from "react";

import useGenerateAvatar from "../../../hooks/useGenerateAvatar.js";
import Button from "../../../components/ui/Button.jsx";
import Loader from "../../../components/ui/Loader.jsx";
import Cookies from "js-cookie";

import { encryption } from "../../../functions/encryption.js";
import { toastSuccess, toastError, Toaster } from "../../../app/Toasts.js";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { VerifySeed } from "../../../functions/mnemonics/verifySeed.js";
import { setInitialAccounts } from "../../../functions/setAccountStates.js";

function ImportWallet() {
  const Navigate = useNavigate();
  const { generateAvatar } = useGenerateAvatar();
  const [seedPhrase, setSeedPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordEye, setPasswordEye] = useState({
    one: false,
    two: false,
  });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordEye = (input, condition) => {
    setPasswordEye((prev) => ({ ...prev, [input]: condition }));
  };

  const handleImportSeed = async () => {
    if (seedPhrase.length === 0) {
      return toastError("Enter seed phrase");
    } else if (
      password.password.length === 0 ||
      password.confirmPassword.length === 0
    ) {
      return toastError("Enter password");
    }
    if (!(password.password === password.confirmPassword)) {
      return toastError("Password do not match");
    }
    const result = await VerifySeed(seedPhrase);

    if (result.success) {
      setLoading(true);
      const encryptedSeed = encryption(seedPhrase, password.password);

      localStorage.setItem("gigalate.seedEncrypted", encryptedSeed);

      localStorage.setItem("gigalate.userCreated", true);

      Cookies.set("gigalate.key", password.confirmPassword, {
        expires: 1 / 24,
      });

      toastSuccess(result.message);

      setTimeout(() => {
        setInitialAccounts(generateAvatar, Navigate);
        setLoading(false);
        Navigate("/home");
      }, 1000);
    } else {
      toastError(result.message);
    }
  };

  return (
    <div className="p-3 gap-3 relative flex flex-col w-full h-full justify-between items-center">
      <Toaster position="top" />
      {loading ? <Loader variant="primary" /> : null}
      <div className="flex flex-col gap-3">
        <div className="flex items-center flex-col gap-1 p-3">
          <h2 className="text-white/90 font-semibold">Import From Seed</h2>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div
            id="seedPhase"
            className="flex items-center gap-2 w-full h-[6pc] px-5 py-2 text-onyx-400/80 bg-onyx-950 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all rounded-md"
          >
            <textarea
              onChange={(e) => setSeedPhrase(e.target.value)}
              className="w-full h-full text-sm resize-none text-onyx-400/80 bg-onyx-950 outline-none"
              placeholder="Seed Phrase"
            />
          </div>
          <div className="flex items-center gap-2 w-full px-5 py-3 text-onyx-400/80 bg-onyx-950 border-[1px] outline-none border-onyx-700/50  hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md">
            <input
              type={isPasswordEye.one ? "text" : "password"}
              className="w-full text-sm bg-onyx-950 outline-none"
              placeholder="New Password"
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
            />
            {isPasswordEye.one ? (
              <RiEyeLine
                onClick={() => passwordEye("one", false)}
                className="h-5 cursor-pointer hover:opacity-80 rounded-full w-5"
              />
            ) : (
              <RiEyeOffLine
                onClick={() => passwordEye("one", true)}
                className="h-5 cursor-pointer hover:opacity-80 rounded-full w-5"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 w-full px-5 py-3 text-onyx-400/80 bg-onyx-950 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md">
              <input
                type={isPasswordEye.two ? "text" : "password"}
                className="w-full text-sm bg-onyx-950 outline-none"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
              />
              {isPasswordEye.two ? (
                <RiEyeLine
                  onClick={() => passwordEye("two", false)}
                  className="h-5 cursor-pointer hover:opacity-80 rounded-full w-5"
                />
              ) : (
                <RiEyeOffLine
                  onClick={() => passwordEye("two", true)}
                  className="h-5 cursor-pointer hover:opacity-80 rounded-full w-5"
                />
              )}
            </div>
            <p className="text-xs px-5 text-white/60">
              Must be at least 8 characters
            </p>
          </div>{" "}
          <p className="text-xs text-white/50">
            The password you entered will be stored locally. If you change
            device or lose your password, you will have to repeat the process of
            adding accounts to gigalate Wallet. gigalate does not store your
            passwords.
          </p>
          {/* <Tooltip
            content=""
            place="left"
            id="asda"
            className="text-white/60"
          >
            Import note
          </Tooltip> */}
        </div>
      </div>
      <Button className="mb-5" onClick={handleImportSeed} variant="primary">
        Import
      </Button>
    </div>
  );
}

export default ImportWallet;
