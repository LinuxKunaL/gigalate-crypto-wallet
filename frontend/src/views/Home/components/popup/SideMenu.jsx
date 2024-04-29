import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOpenInNew,
  MdWifiTethering,
  MdOutlineMode,
  MdOutlineSettings,
  MdLockOutline,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ViewAccount from "../../../../components/Popups/components/Account.view";
import useAccounts from "../../../../hooks/useAccounts";

function SideMenu({ isOpen }) {
  const [isOpenViewAccount, setIsOpenViewAccount] = useState(false);
  const { getCurrentAccount } = useAccounts();
  const Navigate = useNavigate();
  const { network } = JSON.parse(localStorage.getItem("gigalate.setting"));

  const lockWallet = () => {
    sessionStorage.clear();
    Navigate("/lock");
  };

  return isOpen ? (
    <>
      <div className="w-[15pc] flex-col bg-onyx-900 top-[3.4pc] absolute shadow-massive-2 rounded-lg">
        <div
          onClick={() => {
            setIsOpenViewAccount(true);
          }}
          className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
        >
          <MdOutlineMode className=" text-indigo-500 w-5 h-5" />
          <span className="text-white/60 text-sm">Account details</span>
        </div>
        <Link
          target="_blank"
          to={
            network?.blockExplorerUrl +
            "/address/" +
            getCurrentAccount().address
          }
          className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
        >
          <MdOpenInNew className=" text-indigo-500 w-5 h-5" />
          <span className="text-white/60  text-sm">
            View on explorer
            <br />
            <b className="text-xs">
              {network?.blockExplorerUrl.slice(8).replace("/", "")}
            </b>
          </span>
        </Link>
        {/* <div
          onClick={() =>
          is setIsOpenSideMenu()
          }
          className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
        >
          <MdWifiTethering className=" text-indigo-500 w-5 h-5" />
          <span className="text-white/60  text-sm">Connected sites</span>
        </div> */}
        <Link
          to="/setting"
          className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
        >
          <MdOutlineSettings className=" text-indigo-500 w-5 h-5" />
          <span className="text-white/60 text-sm ">Settings</span>
        </Link>
        <div
          onClick={lockWallet}
          className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
        >
          <MdLockOutline className=" text-indigo-500 w-5 h-5" />
          <span className="text-white/60  text-sm">Lock gigalate</span>
        </div>
      </div>
      <ViewAccount
        address={getCurrentAccount().address}
        isOpen={isOpenViewAccount}
        forClose={setIsOpenViewAccount}
      />
    </>
  ) : null;
}

export default SideMenu;
