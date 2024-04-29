import React from "react";
import { IoIosClose } from "react-icons/io";

function ConnectedSite({ id }) {
  return (
    <div id={id} className="hidden w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">
            Connected sites
          </h2>
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
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>{" "}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src="https://gigatrade.vercel.app/fav/android-icon-192x192.png"
                className="h-8 w-8 rounded-full bg-indigo-500/30"
                alt=""
              />
              <span className="text-sm text-white/80">app.uniswap.org</span>
            </div>
            <b className=" select-none text-indigo-500 active:scale-95 hover:text-indigo-400 transition-all font-semibold cursor-pointer text-sm">
              Disconnect
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedSite;
