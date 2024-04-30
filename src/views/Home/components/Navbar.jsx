import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { networkSetting } from "../../../functions/setting";

import HamMenu from "../../../assets/images/HamMenu";
import SideMenu from "./popup/SideMenu";
import SelectAccount from "../../../components/Popups/SelectAccount";
import ConnectedSite from "./popup/ConnectedSite";
import useAccounts from "../../../hooks/useAccounts";
import Tooltip from "../../../components/ui/Tooltip";

function Navbar() {
  const { getCurrentAccount } = useAccounts();
  const [userAccount, setUserAccount] = useState({});
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [isOpenSelectAccount, setIsOpenSelectAccount] = useState(false);
  const [network, setNetwork] = useState();
  const reloadEffect = useSelector((state) => state.reloadUseEffect);
  const navigate = useNavigate();
  const account = getCurrentAccount();

  useEffect(() => {
    const settingNetwork = networkSetting();
    setNetwork(settingNetwork);
    setUserAccount(account);
  }, [reloadEffect]);

  const toggleSelectAccountPopUp = () => {
    document.getElementById("selectedUser").classList.toggle("!bg-onyx-800/20");
    document.getElementById("ArrowDown").classList.toggle("arrowUp");

    if (isOpenSelectAccount) {
      setIsOpenSelectAccount(false);
    } else {
      setIsOpenSelectAccount(true);
    }
  };

  return (
    <nav className="relative z-10 h-14 top-0 flex items-center backdrop-blur-xl backdrop-filter w-full bg-onyx-900/60 shadow-massive-2">
      <HamMenu
        onClick={() =>
          isOpenSideMenu ? setIsOpenSideMenu(false) : setIsOpenSideMenu(true)
        }
        className="absolute left-5"
      />
    {isOpenSideMenu ? <SideMenu /> : null}
      <div
        onClick={toggleSelectAccountPopUp}
        id="selectedUser"
        className="hover:bg-onyx-800/20 select-none active:bg-onyx-800/30 m-auto cursor-pointer transition-all  rounded-lg flex p-1 items-center gap-1"
      >
        <img
          className="size-8 bg-indigo-500 rounded-full p-0.5"
          src={userAccount?.avatar}
          alt=""
        />
        <span className="text-sm text-white/90 w-12 line-clamp-1 leading-snug">
          {userAccount?.accountName}
        </span>
        <MdOutlineKeyboardArrowDown
          id="ArrowDown"
          className="text-white transition-all"
        />
      </div>
      <div className="absolute right-5">
        <Tooltip id="networkIcon" content={network?.networkName}>
          <div
            onClick={() => navigate("/setting/networks")}
            className="size-8 cursor-pointer bg-onyx-950 p-1 rounded-full flex items-center justify-center border-[1px] overflow-hidden border-onyx-700/50 uppercase text-white/70 font-semibold"
          >
            {network?.icon ? (
              <img
                className="w-full h-full rounded-full"
                src={network?.icon}
                alt=""
              />
            ) : (
              network?.networkName?.slice(0, 1)
            )}
          </div>
        </Tooltip>
      </div>
      {isOpenSelectAccount ? (
        <SelectAccount
          togglePopup={toggleSelectAccountPopUp}
        />
      ) : null}
      <ConnectedSite id="ConnectedSitePopUp" />
    </nav>
  );
}

export default Navbar;
