import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";

import Button from "../../../components/ui/Button";
const Contacts = () => {
  return (
    <div className="h-full flex flex-col gap-3 w-full ">
      <div className="flex p-3 justify-between items-center px-4">
        <h1 className="text-white/70">Contacts</h1>
        <Link
          to="/setting"
          className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
        >
          <RiArrowGoBackFill />
        </Link>
      </div>
      <div className="border-onyx-800 h-[75%] overflow-auto flex flex-col gap-6 border-t-[1px]">
        {/* <AddContact /> */}

        <div className="bottom-0 rounded-t-mdg border-t-[1px] border-onyx-800 absolute w-full bg-onyx-950 p-5 flex justify-between items-center">
          <Button
            className="w-full"
            type="secondary"
            text={
              <div className="flex gap-4 h-8 items-center">
                <IoMdPersonAdd /> Add contact
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;

const AddContact = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-4">
        <span className="text-white/80 flex items-center gap-2">Username</span>
        <input
          type="text"
          className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
          placeholder="Enter the username "
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-white/80 flex items-center gap-2">
          Ethereum public address
        </span>
        <input
          type="text"
          className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
          placeholder="Enter the public address "
        />
      </div>
      <div className="flex gap-4">
        <Button className="flex-1" variant="secondary">
          Cancel
        </Button>
        <Button className="flex-1" variant="primary">
          Save
        </Button>
      </div>
    </div>
  );
};
