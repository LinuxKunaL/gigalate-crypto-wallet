import React from "react";

import { IoIosClose } from "react-icons/io";
import ethScan from "../../../../assets/images/ethScan.svg";
import { GrTransaction } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { formatAddress } from "../../../../functions/formatAddress";

function TransactionsHistory({ id, data, visible }) {
  const { nonce, from, to, gas, gasPrice, value, chainId } = data;

  return visible ? (
    <div id={id} className="h-full w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-4 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <div>
            <h2 className="text-white/90 font-semibold text-lg">Send</h2>{" "}
            <span className=" text-xs px-2 py-0.5 bg-green-600 rounded-full text-white">
              Confirmed
            </span>
          </div>
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
          <div className="flex justify-end gap-4">
            <Link className="cursor-pointer hover:opacity-90 transition-all">
              <img
                className="h-8 w-8 p-1 rounded-lg bg-white/90"
                src={ethScan}
                alt=""
              />
            </Link>
            <Link className="h-8 flex justify-center items-center w-8 p-1 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white cursor-pointer hover:opacity-90 transition-all">
              <GrTransaction />
            </Link>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex justify-between">
              <span className=" font-semibold text-white/90">From</span>
              <span className=" font-semibold text-white/90">To</span>
            </div>
            <div className="flex justify-between">
              <span className=" text-onyx-200/90 text-sm cursor-pointer">
                {formatAddress(from)}
              </span>
              <FaArrowRightLong className=" text-indigo-500" />
              <span className=" text-onyx-200/90 text-sm cursor-pointer">
                {formatAddress(to)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className=" font-semibold text-white/90">Transaction</h1>
            <table>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Nonce</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  {Number(nonce)}
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Amount</td>
                <td className="text-xs p-1 text-end text-onyx-200 font-semibold">
                  -0.00412826 SepoliaETH
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Gas Limit (Units)</td>
                <td className="text-xs p-1 text-end text-onyx-400">295873</td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Gas Used (Units)</td>
                <td className="text-xs p-1 text-end text-onyx-400">194538</td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Base fee (GWEI)</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  2.481286741
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">
                  Priority fee (GWEI)
                </td>
                <td className="text-xs p-1 text-end text-onyx-400">2.5</td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Total gas fee</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  0.000969 SepoliaETH
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Max fee per gas</td>
                <td className="text-xs p-1 text-end text-onyx-400">
                  0.000000008 SepoliaETH
                </td>
              </tr>
              <tr>
                <td className="text-xs p-1 text-onyx-400">Total</td>
                <td className="text-xs p-1 text-end text-onyx-200 font-semibold">
                  0.00509731 SepoliaETH
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default TransactionsHistory;
