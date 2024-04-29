// this component is close now

import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { BiImport, BiSolidCopy } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { increase } from "../../../../app/redux/Slice";
import { getBalance } from "../../../../contract/controller/token";
import { IoIosClose } from "react-icons/io";
import { formatAddress } from "../../../../functions/formatAddress";
import { generateAddress } from "../../../../functions/mnemonics/generateAddress";
import { decryption, encryption } from "../../../../functions/encryption";
import { useSelector, useDispatch } from "react-redux";
import { toastError, toastSuccess } from "../../../../app/Toasts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdGridView } from "react-icons/md";

import Button from "../../../../components/ui/Button";
import Tooltip from "../../../../components/ui/Tooltip";
import useGenerateAvatar from "../../../../hooks/useGenerateAvatar";
import useAccounts from "../../../../hooks/useAccounts";
import store from "../../../../app/redux/Store";
import Cookies from "js-cookie";

function SelectAccount({ id, isOpen, togglePopup }) {
  const [userAccounts, setUserAccounts] = useState([]);
  const { deleteAccountById } = useAccounts();
  const [viewAccountAddress, setViewAccountAddress] = useState();

  const reloadEffect = useSelector((state) => state.reloadUseEffect);
  const userAccountState = useSelector((state) => state.userStates);
  const dispatch = useDispatch();
  console.log("hi");
  useEffect(() => {
    const fetchUserAccount = async () => {
      const userAccountsDataInString = localStorage.getItem(
        "gigalate.userAccounts"
      );

      const userAccountsData = JSON.parse(userAccountsDataInString) || [];

      const modifiedData = await Promise.all(
        userAccountsData.map(async (data) => {
          const { balance } = await getBalance(data.address);
          return {
            ...data,
            balance: balance,
          };
        })
      );

      modifiedData.sort((a, b) => a.index - b.index);

      setUserAccounts(modifiedData);
    };
    fetchUserAccount();
  }, [reloadEffect, userAccountState]);

  const handleSetMainAccount = async (address) => {
    const userAccountsString = localStorage.getItem("gigalate.userAccounts");

    const userAccounts = JSON.parse(userAccountsString);

    const modifiedUserAccounts = userAccounts.map((account) => {
      if (account.address === address) {
        account.isMain = true;
        return {
          ...account,
        };
      } else {
        account.isMain = false;
        return { ...account };
      }
    });

    localStorage.setItem(
      "gigalate.userAccounts",
      JSON.stringify(modifiedUserAccounts)
    );

    dispatch(increase(+1));

    toastSuccess("Account change !");
    togglePopup();
  };

  const handleOpenSettingPopup = (id) => {
    document.getElementById(id).classList.toggle("!flex");
  };

  const HandleAccountView = (index) => {
    document.getElementById("ViewAccountPopUp").classList.toggle("!block");
    setViewAccountAddress(index);
  };

  const HandleDeleteAccount = (index) => {
    document.getElementById(`account-popup-${index}`).classList.toggle("!flex");

    if (index === 0) {
      return toastError("You cannot delete");
    }

    const result = deleteAccountById(index);
    if (result) {
      return toastSuccess("account deleted !");
    }
  };

  return isOpen ? (
    <div className="h-[30pc] flex flex-col gap-4 w-full bg-onyx-900 p-3 top-[3.4pc] items-center absolute shadow-massive-2 rounded-lg">
      <h2 className="text-white/70 text-lg font-semibold">Select an account</h2>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="w-[14pc] px-5 py-2 text-onyx-400/80 bg-onyx-950 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
          placeholder="search account"
        />
        <div className="h-8 p-1 flex justify-center items-center w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white cursor-pointer hover:opacity-90 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition-all">
          <IoSearch className="w-full opacity-80 h-full" />
        </div>
      </div>
      <div className="w-full h-[19.8pc]  flex flex-col gap-3 overflow-auto">
        {userAccounts?.map((account) => (
          <div
            kay={account.index}
            className={`flex p-2 relative hover:bg-onyx-950 cursor-pointer rounded-md border-transparent border-l-2 transition-all hover:border-indigo-500 items-center w-full justify-between gap-1 select-none ${
              userAccountState.address === account.address
                ? "!border-indigo-500 bg-onyx-950"
                : null
            }`}
          >
            <div
              onClick={() =>
                handleSetMainAccount(
                  account.address,
                  account.balance,
                  account.avatar,
                  account.accountName
                )
              }
              className="flex w-full justify-evenly"
            >
              <img
                className="size-9 rounded-full"
                src={account?.avatar}
                alt=""
              />
              <div className="flex flex-col ">
                <b className="text-white/90 text-[0.9rem]">
                  {account?.accountName}
                </b>
                <span className=" text-onyx-400 text-sm">
                  {formatAddress(account?.address)}
                </span>
              </div>
              <div className="flex flex-col">
                <b className="text-white/90 text-[0.9rem]">
                  {Number(account?.balance).toFixed(2)} ETH
                </b>
                <span className=" text-onyx-400 text-sm">$ 32</span>
              </div>
            </div>
            <BsThreeDotsVertical
              onClick={(e) =>
                handleOpenSettingPopup(`account-popup-${account.index}`)
              }
              className="text-indigo-500 self-start hover:bg-onyx-900 h-full "
            />
            <div
              id={`account-popup-${account.index}`}
              className=" hidden bg-onyx-950 z-20 gap-1 flex-col w-[5pc] absolute right-5 top-8 border-[1px] border-onyx-800 rounded-md items-center justify-center overflow-hidden"
            >
              <div
                onClick={() => HandleAccountView(account?.address)}
                className="flex hover:bg-onyx-900 transition-all rounded-t-md gap-1 w-full items-center p-1"
              >
                <MdGridView className=" text-white/70 text-sm" />
                <span className="text-sm text-white/90">view</span>
              </div>
              {account.index !== 0 ? (
                <div
                  onClick={() => HandleDeleteAccount(account.index)}
                  className="flex hover:bg-onyx-900 transition-all rounded-t-md gap-1 w-full items-center p-1"
                >
                  <MdDeleteOutline className=" text-white/70 text-sm" />
                  <span className="text-sm text-white/90">delete</span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-0 rounded-t-mdg border-t-[1px] border-onyx-800 absolute w-full bg-onyx-950 h-14 p-2 flex justify-between items-center">
        <Tooltip content="Add a new account" id="addAccount">
          <Button
            onClick={() =>
              document
                .getElementById("CreateAccountPopUp")
                .classList.toggle("!block")
            }
            type="primary"
            text={<MdAdd />}
          />
        </Tooltip>
        <Tooltip content="Import Account" id="ImportAccount">
          <Button
            onClick={() =>
              document
                .getElementById("ImportAccountPopUp")
                .classList.toggle("!block")
            }
            type="secondary"
            text={<BiImport />}
          />
        </Tooltip>
      </div>
      <ImportAccount id="ImportAccountPopUp" />
      <CreateAccount id="CreateAccountPopUp" />
      <ViewAccount address={viewAccountAddress} id="ViewAccountPopUp" />
    </div>
  ) : null;
}

function ImportAccount({ id }) {
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

  return (
    <div id={id} className="hidden w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">
            Import account
          </h2>
          <div
            onClick={() =>
              document.getElementById(id).classList.toggle("!block")
            }
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Account names
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
            onClick={() =>
              document.getElementById(id).classList.toggle("!block")
            }
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
  );
}

function CreateAccount({ id }) {
  const { generateAvatar } = useGenerateAvatar();
  const [accountName, setAccountName] = useState();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const createAccountHandle = async () => {
    const avatarSvg = generateAvatar();

    const userAccountsDataInString = localStorage.getItem(
      "gigalate.userAccounts"
    );

    const userAccountsData = JSON.parse(userAccountsDataInString);

    const { address, privateKey } = await generateAddress(
      userAccountsData.length,
      Navigate
    );

    const key = Cookies.get("gigalate.key");

    userAccountsData.push({
      index: userAccountsData.length,
      address: address,
      accountName: accountName,
      avatar: avatarSvg,
      crypto: {
        symbol: "",
        icon: "",
      },
      isMain: false,
      encryptedPrivateKey: encryption(privateKey, key),
    });

    localStorage.setItem(
      "gigalate.userAccounts",
      JSON.stringify(userAccountsData)
    );

    dispatch(increase(+1));
    toastSuccess("Account created !");
  };

  return (
    <div id={id} className="hidden w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">Add account</h2>
          <div
            onClick={() =>
              document.getElementById(id).classList.toggle("!block")
            }
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
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter your Account name "
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            type="secondary"
            onClick={() =>
              document.getElementById(id).classList.toggle("!block")
            }
            className="flex-1"
            text="Cancel"
          />
          <Button
            onClick={createAccountHandle}
            type="primary"
            className="flex-1"
            text="Create"
          />
        </div>
      </div>
    </div>
  );
}

function ViewAccount({ id, address }) {
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
    getAccount();
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

  return (
    <div id={id} className="hidden w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-4 flex flex-col justify-center items-center rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 w-full justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">Edit Account</h2>
          <div
            onClick={() => {
              document.getElementById(id).classList.toggle("!block");
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
                text="save"
                onClick={handleChangeAccountName}
                type="secondary"
              />
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
            <Button
              onClick={() => setRoute("password")}
              text="Show private key"
              type="primary"
            />
          </div>
        ) : route === "password" ? (
          <div className="flex flex-col items-center gap-5 w-full">
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter password"
            />
            <Button
              onClick={handleDecryptMnemonics}
              text="submit"
              type="primary"
            />
          </div>
        ) : route === "privateKey" ? (
          <div className="flex flex-col items-center gap-5 w-full">
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
  );
}

export default SelectAccount;
