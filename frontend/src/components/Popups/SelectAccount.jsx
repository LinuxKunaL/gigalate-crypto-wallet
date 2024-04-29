import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { increase, load } from "../../app/redux/Slice";
import { formatAddress } from "../../functions/formatAddress";
import { useSelector, useDispatch } from "react-redux";
import { toastError, toastSuccess } from "../../app/Toasts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdGridView } from "react-icons/md";

import Button from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import useAccounts from "../../hooks/useAccounts";
import ImportAccount from "./components/Account.import";
import CreateAccount from "./components/Account.create";
import ViewAccount from "./components/Account.view";

function SelectAccount({ togglePopup }) {
  const [userAccounts, setUserAccounts] = useState([]);
  const { deleteAccountById, getUsersAccounts } = useAccounts();
  const [viewAccountAddress, setViewAccountAddress] = useState();
  const [isOpenCreateAccount, setIsOpenCreateAccount] = useState(false);
  const [isOpenImportAccount, setIsOpenImportAccount] = useState(false);
  const [isOpenViewAccount, setIsOpenViewAccount] = useState(false);
  const [cryptoSymbol, setCryptoSymbol] = useState("ETH");

  const reloadEffect = useSelector((state) => state.reloadUseEffect);
  const userAccountState = useSelector((state) => state.userStates);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserAccount = async () => {
      const result = await getUsersAccounts();
      setUserAccounts(result);

      const settingString = localStorage.getItem("gigalate.setting");
      const settingObject = JSON.parse(settingString);

      setCryptoSymbol(settingObject?.network?.symbol);
    };
    fetchUserAccount();
  }, [reloadEffect, userAccountState]);

  const handleSetMainAccount = async (address) => {
    const userAccountsString = localStorage.getItem("gigalate.userAccounts");

    const userAccounts = JSON.parse(userAccountsString);

    const modifiedUserAccounts = userAccounts.map((account) => {
      if (account.address === address) {
        account.isMain = true;
        return {
          ...account,
        };
      } else {
        account.isMain = false;
        return { ...account };
      }
    });

    localStorage.setItem(
      "gigalate.userAccounts",
      JSON.stringify(modifiedUserAccounts)
    );

    dispatch(increase(+1));
    // dispatch(load(+1));

    toastSuccess("Account change !");
    togglePopup();
  };

  const handleOpenSettingPopup = (id) => {
    document.getElementById(id).classList.toggle("!flex");
  };

  const HandleAccountView = (address, index) => {
    document.getElementById(`account-popup-${index}`).classList.toggle("!flex");
    setIsOpenViewAccount(true);
    setViewAccountAddress(address);
  };

  const HandleDeleteAccount = (index) => {
    document.getElementById(`account-popup-${index}`).classList.toggle("!flex");

    if (index === 0) {
      return toastError("You cannot delete");
    }

    const result = deleteAccountById(index);

    if (result) {
      return toastSuccess("account deleted !");
    }
  };

  const searchAccount = async (searchQuery) => {
    const result = await getUsersAccounts();

    if (!searchQuery) {
      return setUserAccounts(result);
    }

    const filterData = result.filter((e) =>
      e.accountName.toUpperCase().includes(searchQuery.toUpperCase())
    );

    setUserAccounts(filterData);
  };

  return (
    <div className="h-[30pc] flex flex-col gap-4 w-full bg-onyx-900 p-3 top-[3.4pc] items-center absolute shadow-massive-2 rounded-lg">
      <h2 className="text-white/70 text-lg font-semibold">Select an account</h2>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="w-[14pc] px-5 py-2 text-onyx-400/80 bg-onyx-950 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
          placeholder="search account"
          onChange={(e) => searchAccount(e.target.value)}
        />
        <div className="h-8 p-1 flex justify-center items-center w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white cursor-pointer hover:opacity-90 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 transition-all">
          <IoSearch className="w-full opacity-80 h-full" />
        </div>
      </div>
      <div className="w-full h-[19.8pc]  flex flex-col gap-3 overflow-auto">
        {userAccounts.length > 0
          ? userAccounts?.map((account) => (
              <div
                key={account.index}
                className={`flex p-2 relative hover:bg-onyx-950 cursor-pointer rounded-md border-transparent border-l-2 transition-all hover:border-indigo-500 items-center w-full justify-between gap-4 select-none ${
                  userAccountState.address === account.address
                    ? "!border-indigo-500 bg-onyx-950"
                    : null
                }`}
              >
                <div
                  onClick={() =>
                    handleSetMainAccount(
                      account.address,
                      account.balance,
                      account.avatar,
                      account.accountName
                    )
                  }
                  className="flex w-full justify-between gap-5"
                >
                  <img
                    className="size-9 rounded-full"
                    src={account?.avatar}
                    alt=""
                  />
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col ">
                      <b className="text-white/90 text-[0.9rem w-32 line-clamp-1 leading-snug">
                        {account?.accountName}
                      </b>
                      <span className="text-onyx-400 text-sm ">
                        {formatAddress(account?.address)}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <b className="text-white/90 text-[0.9rem]">
                        {Number(account?.balance).toFixed(2)} {cryptoSymbol}
                      </b>
                    </div>
                  </div>
                </div>
                <BsThreeDotsVertical
                  onClick={(e) =>
                    handleOpenSettingPopup(`account-popup-${account.index}`)
                  }
                  className="text-indigo-500 self-start transition-all h-full hover:text-white hover:bg-indigo-500/50 rounded-sm"
                />
                <div
                  id={`account-popup-${account.index}`}
                  className=" hidden bg-onyx-950 z-20 gap-1 flex-col w-[5pc] absolute right-5 top-8 border-[1px] border-onyx-800 rounded-md items-center justify-center overflow-hidden"
                >
                  <div
                    onClick={() =>
                      HandleAccountView(account?.address, account?.index)
                    }
                    className="flex hover:bg-onyx-900 transition-all rounded-t-md gap-1 w-full items-center p-1"
                  >
                    <MdGridView className=" text-white/70 text-sm" />
                    <span className="text-sm text-white/90">view</span>
                  </div>
                  {account.index !== 0 ? (
                    <div
                      onClick={() => HandleDeleteAccount(account.index)}
                      className="flex hover:bg-onyx-900 transition-all rounded-t-md gap-1 w-full items-center p-1"
                    >
                      <MdDeleteOutline className=" text-white/70 text-sm" />
                      <span className="text-sm text-white/90">delete</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex p-2 animate-pulse relative hover:bg-onyx-950 cursor-pointer rounded-md border-transparent border-l-2 transition-all hover:border-indigo-500 items-center w-full justify-between gap-4 select-none !border-indigo-500 bg-onyx-950 "
              >
                <div className="flex w-full justify-between gap-5">
                  <div className="h-[3pc] w-[4pc] self-center rounded-full bg-onyx-700/30 animate-pulse" />
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between gap-2">
                      <b className="text-white/90 h-4 bg-onyx-700/30 rounded-lg animate-pulse text-[0.9rem w-32 line-clamp-1 leading-snug" />
                      <span className="text-onyx-400 h-4 bg-onyx-700/30 rounded-lg animate-pulse text-sm" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <b className="text-white/90 h-5 w-10 bg-onyx-700/30 rounded-lg animate-pulse text-[0.9rem]" />
                    </div>
                  </div>
                </div>
                <BsThreeDotsVertical className="self-start text-onyx-700 transition-all h-full hover:text-white hover:bg-indigo-500/50 rounded-sm" />
              </div>
            ))}
      </div>
      <div className="bottom-0 rounded-t-mdg border-t-[1px] border-onyx-800 absolute w-full bg-onyx-950 h-14 p-2 flex justify-between items-center">
        <Tooltip content="Add a new account" id="addAccount">
          <Button
            onClick={() =>
              isOpenCreateAccount
                ? setIsOpenCreateAccount(false)
                : setIsOpenCreateAccount(true)
            }
            variant="primary"
          >
            <MdAdd />
          </Button>
        </Tooltip>
        <Tooltip content="Import Account" id="ImportAccount">
          <Button
            onClick={() =>
              isOpenImportAccount
                ? setIsOpenImportAccount(false)
                : setIsOpenImportAccount(true)
            }
            variant="secondary"
          >
            <BiImport />
          </Button>
        </Tooltip>
      </div>
      <ImportAccount
        isOpen={isOpenImportAccount}
        forClose={setIsOpenImportAccount}
      />
      <CreateAccount
        isOpen={isOpenCreateAccount}
        forClose={setIsOpenCreateAccount}
      />
      <ViewAccount
        address={viewAccountAddress}
        isOpen={isOpenViewAccount}
        forClose={setIsOpenViewAccount}
      />
    </div>
  );
}

export default SelectAccount;
