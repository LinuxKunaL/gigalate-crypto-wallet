import React, { useEffect, useState } from "react";
import { GrTransaction } from "react-icons/gr";
import { FaCoins } from "react-icons/fa";
import { BsSendCheckFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatAddress } from "../../../../functions/formatAddress";
import { BsStars } from "react-icons/bs";
import { getActivityByAddress } from "../../../../contract/controller/activity";
import { useSelector } from "react-redux";
import { ethersInstance, ethers } from "../../../../contract/util/Contract";
import { getTransactions } from "../../../../functions/transaction";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { handleShowTransactionData } from "../../../../functions/showTransactionData";

import useAccounts from "../../../../hooks/useAccounts";
import Tooltip from "../../../../components/ui/Tooltip";
import Transaction from "../../../../components/Popups/Transaction";

function Activity() {
  const { address } = useSelector((state) => state.userStates);
  const reloadEffect = useSelector((state) => state.reloadUseEffect);

  const { getCurrentAccount, getUserAccountsDataByAddress } = useAccounts();
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [transactionData, setTransactionData] = useState();

  useEffect(() => {
    const settingActivityData = () => {
      const transactions = getTransactions(address);
      setActivityData(transactions);
    };
    settingActivityData();
  }, [reloadEffect]);

  const handlePopupTransaction = async (hash, from, to, value, type) => {
    const result = await handleShowTransactionData(
      hash,
      from,
      to,
      value,
      type,
      address
    );
    if (result) {
      setTransactionData(result?.data);
      setVisiblePopUp(result?.popup);
    }
  };

  return (
    <div className="w-full h-[15pc] border-onyx-800 border-t-[1px]  p-2">
      <div className="flex flex-col h-full gap-3 p-2; overflow-auto">
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
                {data.type === "token" ? (
                  <FaCoins />
                ) : data.type === "crypto" ? (
                  <BsSendCheckFill />
                ) : data.type === "NFT" ? (
                  <BsStars />
                ) : null}
                {data.type === "token" ? (
                  <div className=" absolute rounded-full text-xs font-semibold flex justify-center items-center -bottom-2 -left-0 h-5 w-5 bg-black/50 text-white/50">
                    {data?.symbol?.slice(0, 1)}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <b className=" text-white/90 font-semibold">
                    <span className="text-xs text-white/70">{data?.type}</span>{" "}
                    {data.from === address ? "Send" : "Receive"}
                  </b>
                  <span className="text-green-500 text-sm font-light">
                    Confirmed
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <b className=" text-white/90 font-semibold">
                    {data?.type === "NFT" ? (
                      <>
                        <span className="text-xs text-white/70">Token Id</span>{" "}
                        {data.value}
                      </>
                    ) : (
                      ethers.formatEther(data.value.toString(), "gwei")
                    )}{" "}
                    {transactionData?.type === "crypto" ? data.symbol : null}
                  </b>
                  {transactionData?.type === "crypto" ? (
                    <span className=" text-onyx-300/90 text-sm font-light">
                      $34.3
                    </span>
                  ) : (
                    <span className=" text-onyx-300/90 text-sm font-light">
                      {data.symbol}
                    </span>
                  )}
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
      {visiblePopUp ? (
        <Transaction props={{ transactionData, setVisiblePopUp }} />
      ) : null}
    </div>
  );
}

export default Activity;
