import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { useState } from "react";
import { Toaster, toastError } from "../../../app/Toasts";
import { setAccountStates } from "../../../functions/setAccountStates";
import { Link } from "react-router-dom";
import { getGas, transfer } from "../../../contract/controller/token";
import { useSelector } from "react-redux";
import { formatAddress } from "../../../functions/formatAddress";

import Button from "../../../components/ui/Button";
import Tooltip from "../../../components/ui/Tooltip";
import CryptoTransaction from "./popup/CryptoTransaction";
import { conversion } from "../../../api/conversion.api";
import useAccounts from "../../../hooks/useAccounts";

function SendCrypto() {
  const [isAccountGrater, setIsAccountGrater] = useState(false);
  const [visibleTransactionPopup, setVisibleTransactionPopup] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState();
  const [currencySetting, setCurrencySetting] = useState();
  const [amount, setAmount] = useState();
  const [gasFee, setGasFee] = useState();
  const [openChoiceAddressBox, setOpenChoiceAddressBox] = useState(false);
  const [choiceAddressData, setChoiceAddressData] = useState([]);
  const [fiatCurrency, setFiatCurrency] = useState({
    currencySymbol: "$",
    amount: "0,000,000",
  });
  const { getUsersAccounts } = useAccounts();

  const userAccountState = useSelector((state) => state.userStates);
  const reloadEffect = useSelector((state) => state.reloadUseEffect);

  useEffect(() => {
    const fetching = async () => {
      await setAccountStates();
    };
    fetching();
  }, [reloadEffect]);

  const handleNextPage = async () => {
    if (!receiverAddress) return toastError("Enter address !");

    if (!(receiverAddress.length === 42))
      return toastError("Enter valid address");

    if (!amount) return toastError("Enter amount !");

    const gas = await getGas(receiverAddress, amount, userAccountState.address);
    setGasFee(gas);
    setVisibleTransactionPopup(true);
  };

  useEffect(() => {
    const previousSettingString = localStorage.getItem("gigalate.setting");
    const previousSetting = JSON.parse(previousSettingString);

    setCurrencySetting(previousSetting?.general);
  }, []);

  const setCurrencyPrice = async (_amount) => {
    if (_amount) {
      const fiatCurrency = await conversion(Number(_amount));
      setFiatCurrency(fiatCurrency);
    }
  };

  const openChoiceAddress = async () => {
    setOpenChoiceAddressBox(true);
    const result = await getUsersAccounts();
    setChoiceAddressData(result);
  };

  return (
    <div className="flex items-center gap-4 h-[33.5pc] flex-col">
      <Toaster position="top" />
      <div className="flex justify-between w-full items-center  p-4">
        <h1 className="font-semibold text-lg text-onyx-100">Send</h1>
        <Link
          to="/home"
          className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
        >
          <IoIosClose />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-white/60">From</span>
          <div className="flex gap-1 flex-col">
            <span className="text-end text-white/80">
              {formatAddress(userAccountState.address)}
            </span>
            <b className="text-end text-white/70">
              Balance: {Number(userAccountState.balance).toFixed(4)} ETH
            </b>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-white/60">To</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-[14pc] px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 animate-pulse focus:animate-none hover:animate-none transition-all shadow-massive-2as rounded-md"
              placeholder="Public address (0x)"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
            <Tooltip id="addressSelect" content="Choice address">
              <div
                className="h-8 p-1 flex justify-center items-center w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white cursor-pointer hover:opacity-90  hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition-all"
                onClick={openChoiceAddress}
              >
                <FaRegAddressCard className="w-full h-full" />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="border-onyx-800 border-t-[1px] h-full w-full p-4 flex flex-col gap-3">
        <h1 className="font-semibold text-md text-onyx-100/90">Amount</h1>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className=" flex gap-2 items-center p-2 w-[5pc]">
            <span className="bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text">
              ETH
            </span>
            <input
              type="number"
              className="bg-transparent outline-none text-xl text-onyx-200 w-[8pc]"
              defaultValue={0}
              onChange={(e) => {
                e.target.value > parseFloat(userAccountState.balance)
                  ? setIsAccountGrater(true)
                  : setIsAccountGrater(false);
                setAmount(e.target.value);
                setCurrencyPrice(e.target.value);
              }}
            />
          </div>
          <div className="flex active:scale-95 transition-all items-center justify-center border-[1px] text-white/70 text-sm border-onyx-800/90 w-min px-4 py-1 cursor-pointer rounded-full">
            <span>
              {fiatCurrency.currencySymbol}
              {fiatCurrency.amount}
            </span>
          </div>
        </div>
      </div>
      <div className="flex border-onyx-800 border-t-[1px] justify-evenly items-center  h-full w-full">
        <Button variant="secondary">
          <Link to="/home">Reject</Link>
        </Button>
        <Button
          variant={isAccountGrater ? "disable" : "primary"}
          disable={isAccountGrater}
          onClick={handleNextPage}
        >
          next
        </Button>
      </div>
      {openChoiceAddressBox ? (
        <div className="h-full w-full absolute top-0 z-20 p-3">
          <div className="h-max p-4 gap-4 flex flex-col rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
            <div className="flex justify-between w-full items-center p-1">
              <h1 className="font-semibold text-lg text-onyx-100">
                choice address
              </h1>
              <div
                to="/home"
                className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
                onClick={() => setOpenChoiceAddressBox(false)}
              >
                <IoIosClose />
              </div>
            </div>
            <div className="flex gap-3 flex-col">
              {choiceAddressData?.map((acc) => (
                <div
                  key={acc.address}
                  className="flex p-2 relative hover:bg-onyx-950 cursor-pointer rounded-md border-transparent border-l-2 transition-all hover:border-indigo-500 items-center w-full justify-between gap-4 select-none !border-indigo-500 bg-onyx-950"
                  onClick={() => {
                    setReceiverAddress(acc?.address);
                    setOpenChoiceAddressBox(false);
                  }}
                >
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col ">
                      <b className="text-white/90 text-[0.9rem w-32 line-clamp-1 leading-snug">
                        {acc?.accountName}
                      </b>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-onyx-400 text-sm ">
                        {formatAddress(acc?.address)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {visibleTransactionPopup ? (
        <CryptoTransaction
          setVisibleTransactionPopup={setVisibleTransactionPopup}
          data={{ amount, userAccountState, receiverAddress, gasFee }}
        />
      ) : null}
    </div>
  );
}

export default SendCrypto;
