import { useEffect, useState } from "react";
import { increase } from "../../../app/redux/Slice";
import { decryption } from "../../../functions/encryption";
import { toastError } from "../../../app/Toasts";
import { IoIosClose } from "react-icons/io";
import { formatAddress } from "../../../functions/formatAddress";
import { BiSolidCopy } from "react-icons/bi";

import Button from "../../ui/Button";
import useAccounts from "../../../hooks/useAccounts";
import Tooltip from "../../ui/Tooltip";
import store from "../../../app/redux/Store";

function ViewAccount({ isOpen, forClose, address }) {
  const [route, setRoute] = useState("index");
  const [name, setName] = useState();
  const [key, setKey] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [userAccount, setUserAccount] = useState({});
  const { getUserAccountsDataByAddress } = useAccounts();

  useEffect(() => {
    const getAccount = async () => {
      const result = getUserAccountsDataByAddress(address);
      setUserAccount(result);
    };

    if (address) {
      getAccount();
    }
  }, [address]);

  const handleChangeAccountName = () => {
    const result = getUserAccountsDataByAddress(address);

    result.accountName = name;

    const userAccountsString = localStorage.getItem("gigalate.userAccounts");

    const userAccounts = JSON.parse(userAccountsString);

    userAccounts.some((accounts) => {
      if (accounts.index === result?.index) {
        const modifiedAccount = userAccounts.filter(
          (account) => account?.index !== result?.index
        );

        modifiedAccount.push(result);

        localStorage.setItem(
          "gigalate.userAccounts",
          JSON.stringify(modifiedAccount)
        );

        store.dispatch(increase(+1));

        return null;
      }
    });
  };

  const handleDecryptMnemonics = () => {
    const { encryptedPrivateKey } = getUserAccountsDataByAddress(address);

    const privateKey = decryption(encryptedPrivateKey, key);

    if (privateKey.success) {
      setPrivateKey(privateKey.data);

      setRoute("privateKey");
    } else {
      toastError(privateKey.data);
    }
  };

  return isOpen ? (
    <div className="w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-4 flex flex-col justify-center items-center rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 w-full justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">Edit Account</h2>
          <div
            onClick={() => {
              forClose(false);
              setUserAccount("");
              setRoute("index");
            }}
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9 flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        {route === "index" ? (
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
                placeholder="Edit account name"
                onChange={(e) => setName(e.target.value)}
                defaultValue={userAccount?.accountName}
              />
              <Button
                onClick={handleChangeAccountName}
                className="!rounded-md"
                variant="secondary"
              >
                save
              </Button>
            </div>
            <Tooltip
              id="AddressCopy2"
              content="Copy to clipboard"
              place="bottom"
              AfterCLickContent={"copied"}
              className="flex text-sm items-center cursor-pointer hover:bg-indigo-600 active:bg-indigo-700 shadow-inner active:shadow-black/50 select-none transition-all gap-1 bg-indigo-500 w-min px-5 py-1 rounded-full text-white"
            >
              <span
                onClick={() => navigator.clipboard.writeText(address)}
                className="font-semibold "
              >
                {formatAddress(address)}
              </span>
              <BiSolidCopy />
            </Tooltip>
            <Button onClick={() => setRoute("password")} variant="primary">
              Show private key
            </Button>
          </div>
        ) : route === "password" ? (
          <div className="flex flex-col items-center gap-5 w-full">
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter password"
            />
            <Button onClick={handleDecryptMnemonics} variant="primary">
              submit
            </Button>
          </div>
        ) : route === "privateKey" ? (
          <div className="flex flex-col h-full items-center gap-5 w-full">
            <p className="text-xs text-white/50">
              Your Private Key provides full access to your wallet and funds.
              Never disclose this key. Anyone with your private keys can steal
              any assets held in your account.
            </p>
            <Tooltip
              id="privateKeyCopy"
              content="Copy to clipboard"
              place="bottom"
              AfterCLickContent={"copied"}
              className="flex text-sm flex-col items-center cursor-pointer transition-all gap-1 border-[1px] border-onyx-800  w-full rounded-md p-2 text-white"
            >
              <span
                onClick={() => navigator.clipboard.writeText(privateKey)}
                className="font-semibold text-white/90 break-words w-full text-center"
              >
                {privateKey}
              </span>
              <BiSolidCopy />
            </Tooltip>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}

export default ViewAccount;
