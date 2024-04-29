import React, { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Cookies from "js-cookie";

function ForgotPassword() {
  const [isCheckBox, setIsCheckBox] = useState(false);
  const navigate = useNavigate();

  const resetWallet = () => {
    localStorage.removeItem("gigalate.seedEncrypted");
    localStorage.removeItem("gigalate.userCreated");
    localStorage.removeItem("gigalate.userAccounts");
    Cookies.remove("gigalate.key");
    navigate("/setup/importWallet");
  };
  return (
    <div className="p-3 gap-2 flex flex-col w-full h-full justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <IoWarning className="h-20 w-20 bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-red-400 bg-clip-text" />
        <div className="flex items-center flex-col gap-1 p-2">
          <h2 className="text-white/90 font-semibold">Important notice</h2>
        </div>
        <div className="flex bg-onyx-950 p-2 rounded-md items-center flex-wrap w-full gap-4 relative justify-center h-[15pc] overflow-y-scroll">
          <p className="text-white/60 text-sm text-center">
            gigalate doesn't store a copy of your password. If you encounter
            difficulties accessing your account, you'll have to reset your
            wallet. To do so, you'll need to furnish the Secret Recovery Phrase
            you selected during your wallet setup process. Remember, gigalate
            prioritizes your security. This means that only you have access to
            your wallet's sensitive information.
          </p>
          <p className="text-white/60 text-sm text-center">
            Performing this action will erase your existing wallet and Secret
            Recovery Phrase from this device, as well as the curated list of
            accounts you've saved. Once you reset using a Secret Recovery
            Phrase, you'll be presented with a new list of accounts based on the
            specific Secret Recovery Phrase you utilize for the reset process.
            Notably, this updated list will automatically include any accounts
            that hold a balance.
          </p>
        </div>
      </div>
      <div className="flex gap-1 items-start">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          onChange={(e) => setIsCheckBox(e.target.checked)}
          className="accent-indigo-500 rounded-full hover:accent-indigo-500 focus:accent-indigo-500 "
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 select-none text-sm font-light text-gray-300/80"
        >
          I understand and read that Important notice .
        </label>
      </div>
      <div className="flex gap-2 items-center mb-5">
        <Link to="/lock">
          <Button variant="secondary">cancel</Button>
        </Link>
        {isCheckBox ? (
          // <Link to="">
          <Button onClick={resetWallet} variant="primary">
            reset
          </Button>
        ) : (
          // </Link>
          <Button variant="disable">reset</Button>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
