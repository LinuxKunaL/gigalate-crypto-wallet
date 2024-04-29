import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { toastError, toastSuccess } from "../../../../app/Toasts";
import { IoReload } from "react-icons/io5";
import { ethersInstance } from "../../../../contract/util/Contract";
import { ethers } from "ethers";
import { IoIosClose } from "react-icons/io";
import { formatAddress } from "../../../../functions/formatAddress";
import { FaCoins, FaFileContract } from "react-icons/fa6";
import { MdDeleteForever, MdGeneratingTokens } from "react-icons/md";
import { handleShowTransactionData } from "../../../../functions/showTransactionData";
import {
  addTransaction,
  getTransactions,
} from "../../../../functions/transaction";
import { GrTransaction } from "react-icons/gr";
import { BsSendCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import tokenABI from "../../../../contract/util/TOKEN.ABI.json";
import Button from "../../../../components/ui/Button";
import useAccounts from "../../../../hooks/useAccounts";
import Tooltip from "../../../../components/ui/Tooltip";
import Wallet from "../../../../functions/wallet";
import Transaction from "../../../../components/Popups/Transaction";

function Token() {
  const [isOpenPopups, setIsOpenPopups] = useState({
    view: false,
    send: false,
    add: false,
    import: false,
  });
  const reloadEffect = useSelector((state) => state.reloadUseEffect);
  const { network } = JSON.parse(localStorage.getItem("gigalate.setting"));
  const { getCurrentAccount, getUserAccountsDataByAddress } = useAccounts();
  const [updateUseEffect, setUpdateUseEffect] = useState(1);
  const [listTokens, setListTokens] = useState();
  const [tokenData, setTokenData] = useState();
  const currentAccount = getCurrentAccount();

  useEffect(() => {
    const fetchTokens = async () => {
      if (!currentAccount) return;
      const result = await getUserAccountsDataByAddress(currentAccount.address);

      /* The above code is filtering an array of tokens based on the `chainId` property of each token.
     It is using the `filter` method to create a new array (`filterByChainId`) that only contains
     tokens where the `chainId` matches the `chainId` of the `network` object (if `network` is not
     null or undefined). */
      const filterByChainId = result.tokens.filter(
        (token) => token.chainId === network?.chainId
      );

      const modifiedTokens = await Promise.all(
        filterByChainId.map(async (token) => {
          const balance = await fetchTokenBalance(token.contractAddress);
          return {
            ...token,
            balance: ethers.formatEther(balance, "ether"),
          };
        })
      );
      setListTokens(modifiedTokens);
    };
    fetchTokens();
  }, [updateUseEffect, reloadEffect]);

  const fetchTokenBalance = async (contractAddress) => {
    try {
      const tokenContract = new ethers.Contract(
        contractAddress,
        tokenABI,
        ethersInstance
      );
      const balance = await tokenContract?.balanceOf(currentAccount?.address);
      return balance.toString();
    } catch (error) {
      console.log(error);
      return "0";
    }
  };

  return (
    <>
      <div className="w-full relative h-[15pc]">
        <div className="flex p-2 flex-col gap-2 overflow-auto h-[14.5pc]">
          {listTokens?.length > 0 ? (
            listTokens?.map((token, index) => (
              <div
                key={index}
                onClick={() => {
                  setIsOpenPopups({ ...isOpenPopups, view: true });
                  setTokenData({
                    name: token?.name,
                    symbol: token?.symbol,
                    balance: token?.balance,
                    contractAddress: token?.contractAddress,
                  });
                }}
                className="flex bg-onyx-800/30 hover:bg-onyx-800/40 active:bg-onyx-800/50 select-none cursor-pointer rounded-xl px-3 py-3 gap-2 items-center"
              >
                <div className="bg-onyx-950 uppercase text-white  text-sm w-10 h-10 flex items-center rounded-full justify-center">
                  {token?.symbol?.slice(0, 1)}
                </div>
                <div className="flex flex-col">
                  <b className=" text-white/90 font-semibold">{token?.name}</b>
                  <Tooltip
                    id="forTokenBalance"
                    place="top"
                    content={token?.balance?.toString()}
                  >
                    <span className=" text-onyx-300/90 font-light">
                      {Number(token?.balance).toFixed(2)} {token?.symbol}
                    </span>
                  </Tooltip>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <h1 className="flex text-sm text-white/70 flex-col justify-center items-center">
                <MdGeneratingTokens className=" text-base text-indigo-500" />
                You have no Tokens
              </h1>
            </div>
          )}
        </div>
        <div
          onClick={() => setIsOpenPopups({ ...isOpenPopups, import: true })}
          className=" absolute right-0 bottom-0 mx-3 my-3 inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
        >
          <GoPlus />
        </div>
        <div
          onClick={() => setUpdateUseEffect((pre) => pre + 1)}
          className="absolute right-12 bottom-0 mx-3 my-3 inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
        >
          <IoReload />
        </div>
      </div>
      {isOpenPopups.view ? (
        <ViewToken
          props={{
            isOpenPopups,
            setIsOpenPopups,
            tokenData,
            setUpdateUseEffect,
          }}
        />
      ) : null}
      {isOpenPopups.import ? (
        <ImportToken
          props={{
            isOpenPopups,
            setIsOpenPopups,
            setUpdateUseEffect,
          }}
        />
      ) : null}
      {isOpenPopups.send ? (
        <SendToken
          props={{
            isOpenPopups,
            setIsOpenPopups,
            tokenData,
            setUpdateUseEffect,
          }}
        />
      ) : null}
    </>
  );
}

function SendToken({ props }) {
  const [sendTokenData, setSendTokenData] = useState();
  const [transactionFee, setTransactionFee] = useState(0);
  const { getCurrentAccount, modifiedAccountByAddress } = useAccounts();
  const [isDisable, setTsDisable] = useState(true);
  const currentAccount = getCurrentAccount();

  const transferToken = async () => {
    const wallet = Wallet(currentAccount.address);
    const { network } = JSON.parse(localStorage.getItem("gigalate.setting"));

    if (!sendTokenData?.toAddress) return toastError("Enter address");

    if (!(sendTokenData?.toAddress?.length === 42))
      return toastError("Enter valid address");

    if (!sendTokenData?.amount) return toastError("Enter amount");

    if (sendTokenData?.amount === "0") return toastError("Invalid amount");

    if (Number(props?.tokenData?.balance) <= Number(sendTokenData?.amount))
      return toastError(`insufficient ${props?.tokenData?.name} !`);

    const tokenContract = new ethers.Contract(
      props?.tokenData?.contractAddress,
      tokenABI,
      wallet
    );

    try {
      const tx = await tokenContract.transfer(
        sendTokenData?.toAddress,
        ethers.parseUnits(sendTokenData?.amount.toString(), "ether")
      );

      const iface = new ethers.Interface(tokenABI);
      const decodedData = iface.decodeFunctionData("transfer", tx.data);

      const transactionDataObject = {
        from: tx?.from,
        to: decodedData[0],
        value: Number(decodedData[1]),
        hash: tx?.hash,
        type: "token",
        chainId: network?.chainId,
        symbol: props?.tokenData?.symbol,
      };

      addTransaction(transactionDataObject);

      props?.setUpdateUseEffect((pre) => pre + 1);
      props?.setIsOpenPopups({
        ...props?.isOpenPopups,
        send: false,
        view: false,
      });

      toastSuccess("token transfer!");
    } catch (error) {
      console.log(error);
      return toastError(`some error occur !`);
    }
  };

  const calculateGas = async (_to, _from, _value) => {
    if (_to?.length !== 42) return null;
    if (!_value?.length) return null;

    const ethers = require("ethers");

    try {
      const abiCoder = new ethers.AbiCoder();

      const encodedValue = abiCoder.encode(["uint256"], [_value]).slice(2);

      const encodedFrom = abiCoder.encode(["address"], [_from]).slice(2);

      const encodedTo = abiCoder.encode(["address"], [_to]).slice(2);

      const encodedData = "0x23b872dd" + encodedValue + encodedFrom + encodedTo;

      const gasLimit = await ethersInstance.estimateGas({
        from: _from,
        to: _to,
        data: encodedData,
      });

      setTransactionFee(Number(gasLimit));
    } catch (error) {
      console.log(error);
    }
  };

  const handelPublicAddress = (e) => {
    setSendTokenData({
      ...sendTokenData,
      toAddress: e.target.value,
    });

    if (e.target.value.length === 42) return setTsDisable(false);
  };

  return (
    <div className="w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex justify-between w-full items-center">
          <h1 className="font-semibold text-lg text-onyx-100">Send Token</h1>
          <div
            onClick={() =>
              props?.setIsOpenPopups({ ...props?.isOpenPopups, send: false })
            }
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <span className="text-white/60">From</span>
            <div className="flex gap-1 flex-col">
              <span className="text-end text-white/80">
                {formatAddress(currentAccount?.address)}
              </span>
              <b className="text-end text-white/70">
                Balance: {Number(props?.tokenData?.balance).toFixed(4)}{" "}
                {props?.tokenData?.symbol}
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
                onChange={handelPublicAddress}
              />
            </div>
          </div>
        </div>
        <div className="h-full w-full flex flex-col gap-3">
          <h1 className="font-semibold text-md text-onyx-100/90">Amount</h1>
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className=" flex gap-2 items-center p-2 w-[5pc]">
              <span className="bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text">
                {props?.tokenData?.symbol}
              </span>
              <input
                type="number"
                className="bg-transparent outline-none text-xl text-onyx-200 w-[8pc]"
                defaultValue={0}
                disabled={isDisable}
                onChange={(e) => {
                  setSendTokenData({
                    ...sendTokenData,
                    amount: e.target.value,
                  });
                  calculateGas(
                    sendTokenData?.toAddress,
                    currentAccount?.address,
                    e.target.value
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <h1 className=" font-semibold text-white/90">Total</h1>
          <table>
            <tr>
              <td className="text-xs p-1 text-onyx-400">gas (gwei)</td>
              <td className="text-xs p-1 text-end text-onyx-400 ">
                {transactionFee} gwei
              </td>
            </tr>
            <tr>
              <td className="text-xs p-1 text-onyx-400">Total</td>
              <td className="text-sm underline underline-offset-4 animate-pulse p-1 text-end text-onyx-200 font-semibold">
                {transactionFee} gwei
              </td>
            </tr>
          </table>
        </div>
        <div className="flex justify-evenly items-center h-full w-full">
          {/* <Button type="secondary" text={<Link>Reject</Link>} /> */}
          <Button
            // type={isAccountGrater ? "disable" : "primary"}
            // disable={isAccountGrater}
            // onClick={handleSendCrypto}
            variant="primary"
            onClick={transferToken}
          >
            next
          </Button>
        </div>
      </div>
    </div>
  );
}

function ViewToken({ props }) {
  const { getCurrentAccount, deleteAccountById } = useAccounts();
  const [activityData, setActivityData] = useState();
  const currentAccount = getCurrentAccount();
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const [transactionData, setTransactionData] = useState();

  const removeToken = (contractAddress) => {
    const currentAccount = getCurrentAccount();
    deleteAccountById(currentAccount.index);

    var userAccountsStrings = localStorage.getItem("gigalate.userAccounts");
    var userAccount = JSON.parse(userAccountsStrings);

    const modifiedToken = currentAccount?.tokens.filter(
      (token) => token.contractAddress !== contractAddress
    );

    currentAccount.tokens = modifiedToken;
    userAccount.push(currentAccount);
    localStorage.setItem("gigalate.userAccounts", JSON.stringify(userAccount));

    props?.setIsOpenPopups({ ...props?.isOpenPopups, view: false });
    props?.setUpdateUseEffect((pre) => pre + 1);
  };

  useEffect(() => {
    const fetchingTokenActivity = async () => {
      const response = getTransactions(currentAccount.address, "token");
      setActivityData(response);
    };
    fetchingTokenActivity();
  }, []);

  const handlePopupTransaction = async (hash, from, to, value, type) => {
    const result = await handleShowTransactionData(
      hash,
      from,
      to,
      value,
      type,
      currentAccount.address
    );
    if (result) {
      setTransactionData(result?.data);
      setVisiblePopUp(result?.popup);
    }
  };

  return (
    <div className="w-full h-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-7 flex flex-col justify-between rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 w-full justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">
            View Token :{" "}
            <b className="text-sm text-white/60 font-semibold">
              {props?.tokenData?.name}
            </b>
          </h2>
          <div
            onClick={() =>
              props?.setIsOpenPopups({ ...props?.isOpenPopups, view: false })
            }
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9 flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Tooltip
            content="Copy contract address"
            AfterCLickContent="copied!"
            id="copyContractAddress"
          >
            <div
              onClick={() =>
                navigator.clipboard.writeText(props?.tokenData?.contractAddress)
              }
              className="inline-flex cursor-pointer items-center justify-center h-9 w-9 flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
            >
              <FaFileContract />
            </div>
          </Tooltip>

          <Tooltip content="Delete Token" id="deleteToken">
            <div
              onClick={() => removeToken(props?.tokenData?.contractAddress)}
              className="inline-flex cursor-pointer items-center justify-center h-9 w-9 flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
            >
              <MdDeleteForever />
            </div>
          </Tooltip>
        </div>
        <div className="flex items-center flex-col ">
          <h2 className="text-2xl bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text drop-shadow-lg">
            {Number(props?.tokenData?.balance).toFixed(4)}{" "}
            {props?.tokenData?.symbol}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={() =>
              props?.setIsOpenPopups({ ...props?.isOpenPopups, send: true })
            }
            variant="primary"
          >
            send
          </Button>
        </div>
        <span className=" text-onyx-400 text-sm border-onyx-700/50 pt-4 border-t-[1px]">
          Transactions
        </span>
        <div className="flex flex-col h-full gap-3 overflow-auto">
          {activityData?.length > 0 ? (
            activityData?.map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  handlePopupTransaction(
                    data?.hash,
                    data?.from,
                    data?.to,
                    data?.value,
                    data?.type
                  );
                }}
                className="flex bg-onyx-800/30 hover:bg-onyx-800/40 active:bg-onyx-800/50 select-none cursor-pointer rounded-xl px-3 py-3 gap-2 items-center"
              >
                <div className="h-9 relative bg-onyx-900 w-10 flex justify-center items-center rounded-full text-indigo-500">
                  {data.from === currentAccount.address ? (
                    <BsSendCheckFill />
                  ) : (
                    <FaCoins />
                  )}
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <b className=" text-white/90 font-semibold">
                      {data.from === currentAccount.address
                        ? "Send"
                        : "Receive"}
                    </b>
                    <span className="text-green-500 text-sm font-light">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <b className=" text-white/90 font-semibold">
                      {ethers.formatEther(data.value.toString(), "gwei")}
                    </b>
                    <span className=" text-onyx-300/90 text-sm font-light">
                      {data.symbol}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <h1 className="flex text-sm text-white/70 flex-col justify-center items-center">
                <GrTransaction className=" text-base text-indigo-500" />
                You have no transactions
              </h1>
            </div>
          )}
        </div>
      </div>
      {visiblePopUp ? (
        <Transaction props={{ transactionData, setVisiblePopUp }} />
      ) : null}
    </div>
  );
}

function ImportToken({ props }) {
  const [tokenContractAddress, setTokenContractAddress] = useState();
  const { getCurrentAccount, modifiedAccountByAddress } = useAccounts();
  const [tokenDetails, setTokenDetails] = useState({
    isDisable: true,
    name: "",
    symbol: "",
    decimal: 0,
    forUserBalance: "",
  });

  const currentAccount = getCurrentAccount();

  const displayTokenDetails = async (_contractAddress) => {
    if (_contractAddress?.length !== 42) return null;

    const wallet = Wallet(currentAccount.address);

    const tokenContract = new ethers.Contract(
      _contractAddress,
      tokenABI,
      wallet
    );

    try {
      const tokenSymbol = await tokenContract.symbol();
      const tokenName = await tokenContract.name();
      // const tokenDecimal = await tokenContract.decimals();
      const forUserBalance = await tokenContract.balanceOf(
        currentAccount.address
      );

      setTokenDetails({
        isDisable: false,
        symbol: tokenSymbol,
        name: tokenName,
        decimal: 18,
        forUserBalance: ethers.parseUnits(forUserBalance.toString(), "wei"),
      });
    } catch (error) {
      console.log(error.message);
      toastError("Token decimal is invalid");
    }
  };

  const addTokenInWallet = async () => {
    const { network } = JSON.parse(localStorage.getItem("gigalate.setting"));
    const { index } = currentAccount;

    if (tokenDetails.isDisable) return toastError("Enter address");

    modifiedAccountByAddress(
      {
        name: tokenDetails.name,
        contractAddress: tokenContractAddress,
        symbol: tokenDetails.symbol,
        decimal: tokenDetails.decimal,
        chainId: network?.chainId,
      },
      index,
      "tokens"
    );

    toastSuccess("Token imported!");

    props?.setUpdateUseEffect((pre) => pre + 1);
    props?.setIsOpenPopups({ ...props?.isOpenPopups, import: false });
  };

  return (
    <div className="w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-4 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">Import tokens</h2>
          <div
            onClick={() =>
              props?.setIsOpenPopups({ ...props?.isOpenPopups, import: false })
            }
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div>
          <h2 className=" text-white/70 font-semibold">Custom token</h2>
          <p className="text-xs text-onyx-300s text-yellow-400/80 animate-pulse">
            Make sure you trust a token before you import it.
          </p>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Token contract address
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              placeholder="Enter Token contract address"
              onChange={(e) => {
                setTokenContractAddress(e.target.value);
                displayTokenDetails(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Token symbol
            </span>
            <input
              type="text"
              className={`${
                tokenDetails.isDisable ? "cursor-not-allowed" : ""
              } w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md`}
              disabled={tokenDetails.isDisable}
              placeholder="Enter Token symbol"
              value={tokenDetails.symbol}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Token decimal
            </span>
            <input
              type="number"
              className={`${
                tokenDetails.isDisable ? "cursor-not-allowed" : ""
              } w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md`}
              disabled={tokenDetails.isDisable}
              placeholder="Enter Token decimal"
              value={tokenDetails.decimal}
            />
          </div>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <span className="text-white/80 text-sm flex items-center gap-2">
            Token details
          </span>
          <div className="flex p-1 rounded-md gap-3 items-center justify-center">
            <div
              className={`${
                tokenDetails.isDisable ? "animate-pulse" : ""
              } bg-onyx-950 uppercase text-white text-sm w-14 h-12 flex items-center rounded-full justify-center`}
            >
              {tokenDetails?.symbol?.slice(0, 1)}
            </div>
            <div className="flex w-full flex-col gap-1 h-full">
              <span
                className={`text-white ${
                  tokenDetails.isDisable
                    ? "bg-onyx-950 rounded-md animate-pulse"
                    : ""
                } h-5 w-[4pc] font-semibold`}
              >
                {tokenDetails?.symbol}
              </span>
              <legend
                className={`text-indigo-500 ${
                  tokenDetails.isDisable
                    ? "bg-onyx-950 rounded-md animate-pulse"
                    : ""
                } h-6 w-[7pc]`}
              >
                {tokenDetails?.forUserBalance} {tokenDetails?.symbol}
              </legend>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              props?.setIsOpenPopups({ ...props?.isOpenPopups, import: false })
            }
            className="flex-1"
            text=""
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={addTokenInWallet}
          >
            Import
          </Button>
        </div>
      </div>
      {/* <div id="popUpAddToken" className="w-full absolute top-0 z-30 p-3">
        <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
          <div className="flex gap-3 justify-between items-center ">
            <h2 className="text-white/90 font-semibold text-lg">
              Import tokens
            </h2>
            <div
              onClick={() =>
                document
                  .getElementById("popUpAddToken")
                  .classList.toggle("!flex")
              }
              className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
            >
              <IoIosClose />
            </div>
          </div>
          <div>
            <p className="text-xs text-onyx-300s text-yellow-400/80 animate-pulse">
              Would you like to import this token?
            </p>
          </div>
          <div className="overflow-auto flex flex-col gap-4">
            <div className="flex gap-3 items-center ">
              <div className="bg-onyx-950 uppercase text-white  text-sm w-10 h-10 flex items-center rounded-full justify-center">
                {tokenDetails?.symbol?.slice(0, 1)}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">
                  {tokenDetails?.symbol}
                </span>
                <legend className="text-white/80 font-semibold">
                  {tokenDetails?.forUserBalance} {tokenDetails?.symbol}
                </legend>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              type="secondary"
              onClick={() =>
                document
                  .getElementById("popUpAddToken")
                  .classList.toggle("!flex")
              }
              className="flex-1"
              text="Cancel"
            />
            <Button
              type="primary"
              className="flex-1"
              // onClick={importToken}
              text="Import"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Token;
