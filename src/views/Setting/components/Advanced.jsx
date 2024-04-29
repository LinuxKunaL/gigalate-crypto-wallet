import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import Button from "../../../components/ui/Button";
import Tooltip from "../../../components/ui/Tooltip";
function Advanced() {
  return (
    <div className="h-full flex flex-col gap-3 w-full ">
      <div className="flex p-3 justify-between items-center px-4">
        <h1 className="text-white/70">Advanced</h1>
        <Link
          to="/setting"
          className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
        >
          <RiArrowGoBackFill />
        </Link>
      </div>
      <div className="border-onyx-800 h-[75%] overflow-auto flex flex-col gap-6 border-t-[1px] p-4">
        <div className="flex flex-col gap-4">
          <span className="text-white/80 flex items-center gap-2">
            State logs
            <Tooltip
              id="ExclamationForStateLog"
              content="The state logs encapsulate public <br> account addresses and <br> transaction records."
            >
              <FaCircleExclamation className="cursor-pointer" />
            </Tooltip>
          </span>
          <Button variant="secondary">Download</Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 flex items-center gap-2">
              Clear activity and nonce data
              <Tooltip
                id="ExclamationForSClearActivity"
                content="Resetting the account's nonce <br> and clearing activity tab data <br> in the wallet impacts only the current <br> account and network. Balances and  <br> incoming transactions <br> remain unaffected."
              >
                <FaCircleExclamation className="cursor-pointer" />
              </Tooltip>
            </span>
            <Button variant="reddest">Clear activity</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <span className="text-white/80 flex items-center gap-2">
              Show conversion on <br />
              test networks
              <Tooltip
                id="ExclamationShowConversion"
                content="Select to display fiat <br> conversion on test networks."
              >
                <FaCircleExclamation className="cursor-pointer" />
              </Tooltip>
            </span>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer bg-onyx-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white/80 after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center gap-4">
            <span className="text-white/80 flex items-center gap-2">
              Show test networks
              <Tooltip
                id="ExclamationForTestNetworks"
                content="Toggle to display test <br> networks in the network list"
              >
                <FaCircleExclamation className="cursor-pointer" />
              </Tooltip>
            </span>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer bg-onyx-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white/80 after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white/80 flex items-center gap-2">
            Back up your data
            <Tooltip
              id="ExclamationForBackUp"
              content="You can back up data like <br> your contacts and preferences."
            >
              <FaCircleExclamation className="cursor-pointer" />
            </Tooltip>
          </span>
          <Button variant="secondary">Back up</Button>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white/80 flex items-center gap-2">
            Restore user data
            <Tooltip
              id="ExclamationForRestore"
              content="You can restore data like <br> contacts and preferences <br> from a backup file."
            >
              <FaCircleExclamation className="cursor-pointer" />
            </Tooltip>
          </span>
          <Button variant="secondary">Restore</Button>
        </div>
      </div>
    </div>
  );
}

export default Advanced;
