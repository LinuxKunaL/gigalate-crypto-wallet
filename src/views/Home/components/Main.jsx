import React, { useState, useEffect } from "react";
import { BiSolidCopy } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { PiWalletFill } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdGeneratingTokens } from "react-icons/md";
import { RiNftFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { useSelector } from "react-redux";
import { verifyUser } from "../../../functions/mnemonics/verifyUser.js";
import { formatAddress } from "../../../functions/formatAddress";
import { setAccountStates } from "../../../functions/setAccountStates.js";
import { conversion } from "../../../api/conversion.api.js";
import { setDefaultSettingData } from "../../../functions/setting.js";
import { Toaster } from "../../../app/Toasts.js";

import Tooltip from "../../../components/ui/Tooltip.jsx";
import Token from "./HomeTab/Token";
import NFTs from "./HomeTab/NFTs";
import Activity from "./HomeTab/Activity";

function Main() {
  const [Tab, setTab] = useState("token");
  const [fiatCurrency, setFiatCurrency] = useState({
    currencySymbol: "$",
    amount: "0,000,000",
  });
  const navigate = useNavigate();
  const [currencySetting, setCurrencySetting] = useState();
  const [networkSetting, setNetworkSetting] = useState();
  const reloadEffect = useSelector((state) => state.reloadUseEffect);
  const userAccount = useSelector((state) => state.userStates);

  useEffect(() => {
    const fetchData = async () => {
      await verifyUser(navigate);
      setDefaultSettingData();
      await setAccountStates();
    };
    fetchData();
  }, [reloadEffect]);

  useEffect(() => {
    const fetchData = async () => {
      if (userAccount?.address) {
        const fiatCurrency = await conversion(Number(userAccount.balance));
        setFiatCurrency(fiatCurrency);
      }
    };
    fetchData();
  }, [userAccount]);

  useEffect(() => {
    const previousSettingString = localStorage.getItem("gigalate.setting");
    const previousSetting = JSON.parse(previousSettingString);

    setCurrencySetting(previousSetting?.general);
    setNetworkSetting(previousSetting?.network);
  }, []);

  const TabComponents = {
    token: <Token />,
    NFTs: <NFTs />,
    activity: <Activity />,
  };

  return (
    <div className="flex items-center gap-7 h-[33.5pc] flex-col">
      <Toaster />
      <Tooltip
        id="AddressCopy"
        content="Copy to clipboard"
        place="bottom"
        AfterCLickContent={"copied"}
        className="flex mt-5 text-sm items-center cursor-pointer hover:bg-indigo-600 active:bg-indigo-700 shadow-inner active:shadow-black/50 select-none transition-all gap-1 bg-indigo-500 w-min px-5 py-1 rounded-full text-white"
      >
        <span
          onClick={() => navigator.clipboard.writeText(userAccount?.address)}
          className="font-semibold "
        >
          {formatAddress(userAccount?.address)}
        </span>
        <BiSolidCopy />
      </Tooltip>
      <div className="flex items-center justify-center flex-col ">
        {currencySetting?.primaryCurrency === "ETH" ? (
          <>
            <h2 className="text-2xl bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text drop-shadow-lg">
              {Number(userAccount?.balance).toFixed(4)} {networkSetting?.symbol}
            </h2>
            <span className="font-light flex text-lg text-onyx-300 h-[1.7pc] text-center rounded-md">
              {fiatCurrency?.currencySymbol} {fiatCurrency?.amount}
            </span>
          </>
        ) : (
          <>
            <h2 className="text-2xl bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text drop-shadow-lg">
              {fiatCurrency?.currencySymbol} {fiatCurrency?.amount}
            </h2>
            <span className="flex flex-row gap-2 text-center justify-center items-center font-light text-lg text-onyx-300 h-[1.7pc] rounded-md">
              {Number(userAccount?.balance).toFixed(4)} {networkSetting?.symbol}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center justify-evenly w-full">
        <Link
          to="send"
          className="inline-flex cursor-pointer items-center justify-center h-14 w-14  flex-col gap-1 text-sm text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
        >
          <BsSendFill />
          <span className="text-[0.7rem]">Send</span>
        </Link>
        <Link
          to="receive"
          className="inline-flex cursor-pointer items-center justify-center h-14 w-14 flex-col gap-1 text-sm  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
        >
          <PiWalletFill />
          <span className="text-[0.7rem]">Receive</span>
        </Link>
        <div className="inline-flex cursor-pointer items-center justify-center h-14 w-14  flex-col gap-1 text-sm  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900">
          <FaCirclePlus />
          <span className="text-[0.7rem]">Buy</span>
        </div>
      </div>
      <div className=" flex flex-col w-full h-full px-0 border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap justify-evenly items-center -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 border-onyx-800 border-b-[1px]">
          <li className=" flex-1 flex flex-row justify-center items-center">
            <MdGeneratingTokens />
            <div
              onClick={() => setTab("token")}
              className={`${
                Tab === "token" ? "!border-indigo-500" : ""
              } inline-flex cursor-pointer items-center justify-center p-3  border-transparent rounded-t-lg hover:text-gray-600 hover:border-indigo-500 transition-all border-b-2 dark:hover:text-gray-300 group`}
            >
              Token
            </div>
          </li>
          <li className=" flex-1 flex flex-row justify-center items-center">
            <RiNftFill />
            <div
              onClick={() => setTab("NFTs")}
              className={`${
                Tab === "NFTs" ? "!border-indigo-500" : ""
              } inline-flex cursor-pointer items-center justify-center p-3  border-transparent rounded-t-lg hover:text-gray-600 hover:border-indigo-500 transition-all border-b-2 dark:hover:text-gray-300 group`}
            >
              NFTs
            </div>
          </li>
          <li className=" flex-1 flex flex-row justify-center items-center">
            <FaHistory />
            <div
              onClick={() => setTab("activity")}
              className={`${
                Tab === "activity" ? "!border-indigo-500" : ""
              } inline-flex cursor-pointer items-center justify-center p-3  border-transparent rounded-t-lg hover:text-gray-600 hover:border-indigo-500 transition-all border-b-2 dark:hover:text-gray-300 group`}
            >
              Activity
            </div>
          </li>
        </ul>
        {TabComponents[Tab]}
      </div>
    </div>
  );
}

export default Main;
