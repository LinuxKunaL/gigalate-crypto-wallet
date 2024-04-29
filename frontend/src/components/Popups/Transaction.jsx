import ethScan from "../../assets/images/ethScan.svg";
import Tooltip from "../ui/Tooltip";

import { networkSetting } from "../../functions/setting";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { ethers } from "ethers";
import { formatAddress } from "../../functions/formatAddress";

function Transaction({ props }) {
  const { blockExplorerUrl } = networkSetting();

  return (
    <div className="h-full w-full absolute left-0 top-0 z-30 p-3">
      <div className="h-full p-4 gap-4 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <div className="flex flex-col gap-2">
            <h2 className="text-white/90 font-semibold text-lg">
              {props?.transactionData?.transaction}
            </h2>
            <span className=" text-xs px-2 py-0.5 bg-green-600 rounded-full text-white">
              Confirmed
            </span>
          </div>
          <div
            onClick={() => {
              props?.setVisiblePopUp(false);
            }}
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <div className="flex justify-end gap-4">
            <Link
              to={`${blockExplorerUrl}tx/${props?.transactionData?.hash}`}
              target="_blank"
              className="cursor-pointer hover:opacity-90 transition-all"
            >
              <img
                className="h-8 w-8 p-1 rounded-lg bg-white/90"
                src={ethScan}
                alt=""
              />
            </Link>
            <Tooltip
              content="Copy hash"
              place="left"
              id="copyTransactionHash"
              AfterCLickContent="Copied"
            >
              <Link
                onClick={() =>
                  navigator.clipboard.writeText(props?.transactionData?.hash)
                }
                className="h-8 flex justify-center items-center w-8 p-1 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white cursor-pointer hover:opacity-90 transition-all"
              >
                <GrTransaction />
              </Link>
            </Tooltip>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex justify-between">
              <span className=" font-semibold text-white/90">From</span>
              <span className=" font-semibold text-white/90">To</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-onyx-200/90 text-sm cursor-pointer">
                {formatAddress(props?.transactionData?.from)}
              </span>
              <FaArrowRightLong className=" text-indigo-500" />
              <span className=" text-onyx-200/90 text-sm cursor-pointer">
                {formatAddress(props?.transactionData?.to)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className=" font-semibold text-white/90">Transaction</h1>
            <table>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Nonce</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {Number(props?.transactionData?.nonce)}
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">
                  {props?.transactionData?.type !== "NFT" ? "Amount" : "NFT id"}
                </td>
                <td className="text-xs p-1 text-end text-onyx-200 font-semibold">
                  {props?.transactionData?.type !== "NFT"
                    ? props?.transactionData?.transaction === "Receive"
                      ? null
                      : "-"
                    : null}{" "}
                  {props?.transactionData?.type === "NFT"
                    ? props?.transactionData?.value
                    : ethers.formatEther(
                        props?.transactionData?.value.toString(),
                        "gwei"
                      )}
                  {props?.transactionData?.symbol}
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Gas Price (gwei)</td>
                <td className="text-xs cursor-pointer p-1 text-end text-onyx-400">
                  <Tooltip
                    content={
                      ethers.formatEther(
                        props?.transactionData?.gasPrice.toString(),
                        "gwei"
                      ) + " ETH"
                    }
                    id="gasPrice"
                  >
                    {ethers.formatUnits(
                      props?.transactionData?.gasPrice.toString(),
                      "gwei"
                    )}
                  </Tooltip>
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Gas Limit (Units)</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {Number(props?.transactionData?.gasLimit).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Gas Used (Units)</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {Number(props?.transactionData?.gasUsed).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Base fee (gwei)</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {ethers.formatUnits(
                    props?.transactionData?.maxPriorityFeePerGas?.toString(),
                    "gwei"
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Total gas fee</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {ethers.formatUnits(
                    props?.transactionData?.gasUsed?.toString(),
                    "wei"
                  )}{" "}
                  Wei
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Max fee per gas</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {ethers.formatUnits(
                    props?.transactionData?.maxFeePerGas?.toString(),
                    "wei"
                  )}{" "}
                  Wei
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Total</td>
                <td className="text-xs p-1 text-end text-onyx-200 font-semibold">
                  {props?.transactionData?.type === "NFT"
                    ? props?.transactionData?.value
                    : ethers.formatEther(
                        props?.transactionData?.value.toString(),
                        "gwei"
                      )}
                  {props?.transactionData?.symbol}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Transaction;
