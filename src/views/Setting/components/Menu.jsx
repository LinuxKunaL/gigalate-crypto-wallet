import React from "react";
import { IoMdGitNetwork } from "react-icons/io";
import {
  MdOutlineSettings,
  MdOutlineSettingsInputComponent,
  MdOutlineSecurity,
} from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Menu() {
  const navigate = useNavigate();
 
  const logout = () => {
    localStorage.removeItem("gigalate.seedEncrypted");
    localStorage.removeItem("gigalate.userCreated");
    localStorage.removeItem("gigalate.userAccounts");
    localStorage.removeItem("gigalate.network");
    localStorage.removeItem("gigalate.setting");
    Cookies.remove("gigalate.key");
    navigate("/");
  };

  return (
    <div className="border-onyx-800 border-t-[1px] h-full w-full flex flex-col">
      <Link
        to="general"
        className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
      >
        <MdOutlineSettings className=" text-indigo-500 w-5 h-5" />
        <span className="text-white/60 text-sm">General</span>
      </Link>
      <Link
        to="advanced"
        className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
      >
        <MdOutlineSettingsInputComponent className=" text-indigo-500 w-5 h-5" />
        <span className="text-white/60 text-sm">Advanced</span>
      </Link>
      <Link
        to="securityPrivacy"
        className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
      >
        <MdOutlineSecurity className=" text-indigo-500 w-5 h-5" />
        <span className="text-white/60 text-sm">Security & privacy</span>
      </Link>
      <Link
        to="networks"
        className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
      >
        <IoMdGitNetwork className=" text-indigo-500 w-5 h-5" />
        <span className="text-white/60 text-sm">Networks</span>
      </Link>
      <div
        onClick={logout}
        className="px-4 border-l-2 border-transparent hover:border-indigo-500 py-5 cursor-pointer active:bg-onyx-950/60 transition-all hover:bg-onyx-950 flex items-center gap-2"
      >
        <BiLogOutCircle className=" text-indigo-500 w-5 h-5" />
        <span className="text-white/60 text-sm">Logout</span>
      </div>
    </div>
  );
}

export default Menu;
