import React from "react";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between w-full items-center  p-4">
      <h1 className="font-semibold text-lg text-onyx-100">Setting</h1>
      <Link
        to="/home"
        className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
      >
        <IoIosClose />
      </Link>
    </div>
  );
}

export default Header;
