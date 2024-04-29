import { useState } from "react";
import { increase } from "../../../app/redux/Slice";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { encryption } from "../../../functions/encryption";
import { toastSuccess } from "../../../app/Toasts";
import { ethers } from "ethers";

import Button from "../../ui/Button";
import useGenerateAvatar from "../../../hooks/useGenerateAvatar";
import Cookies from "js-cookie";

function ImportAccount({ isOpen, forClose }) {
  const [privateKay, setPrivateKay] = useState("");
  const [accountName, setAccountName] = useState("");
  const { generateAvatar } = useGenerateAvatar();

  const dispatch = useDispatch();

  const handleImportAccount = () => {
    const avatarSvg = generateAvatar();

    const wallet = new ethers.Wallet(privateKay);

    const userAccountsString = localStorage.getItem("gigalate.userAccounts");

    const key = Cookies.get("gigalate.key");

    const userAccounts = JSON.parse(userAccountsString);

    userAccounts.push({
      index: userAccounts.length,
      address: wallet.address,
      accountName: accountName,
      avatar: avatarSvg,
      NFTs: [],
      tokens: [],
      transactionData: [],
      crypto: {
        symbol: "",
        icon: "",
      },
      encryptedPrivateKey: encryption(wallet.privateKey, key),
    });

    localStorage.setItem("gigalate.userAccounts", JSON.stringify(userAccounts));

    dispatch(increase(+1));
    toastSuccess("Account imported !");
    setPrivateKay("");
    setAccountName("");
  };

  return isOpen ? (
    <div className="w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">
            Import account
          </h2>
          <div
            onClick={() => forClose(false)}
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Account name
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              value={accountName}
              placeholder="Enter your Account name "
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              private key string here
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              value={privateKay}
              placeholder="Enter your private key string"
              onChange={(e) => setPrivateKay(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => forClose(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleImportAccount}
            className="flex-1"
          >
            Import
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ImportAccount;
