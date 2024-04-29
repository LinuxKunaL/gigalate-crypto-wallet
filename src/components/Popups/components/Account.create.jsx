import { useState } from "react";
import { increase } from "../../../app/redux/Slice";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { encryption } from "../../../functions/encryption";
import { toastError, toastSuccess } from "../../../app/Toasts";
import { useNavigate } from "react-router-dom";
import { generateAddress } from "../../../functions/mnemonics/generateAddress";

import Button from "../../ui/Button";
import useGenerateAvatar from "../../../hooks/useGenerateAvatar";
import Cookies from "js-cookie";

function CreateAccount({ isOpen, forClose }) {
  const { generateAvatar } = useGenerateAvatar();
  const [accountName, setAccountName] = useState();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const createAccountHandle = async () => {
    if (!accountName) return toastError("Enter account name!");

    const avatarSvg = generateAvatar();

    const userAccountsDataInString = localStorage.getItem(
      "gigalate.userAccounts"
    );

    const userAccountsData = JSON.parse(userAccountsDataInString);

    const { address, privateKey } = await generateAddress(
      userAccountsData.length,
      Navigate
    );

    const key = Cookies.get("gigalate.key");

    userAccountsData.push({
      index: userAccountsData.length,
      address: address,
      accountName: accountName,
      avatar: avatarSvg,
      NFTs: [],
      tokens: [],
      transactionData:[],
      crypto: {
        symbol: "",
        icon: "",
      },
      isMain: false,
      encryptedPrivateKey: encryption(privateKey, key),
    });

    localStorage.setItem(
      "gigalate.userAccounts",
      JSON.stringify(userAccountsData)
    );

    dispatch(increase(+1));
    toastSuccess("Account created !");
  };

  return isOpen ? (
    <div className=" w-full absolute top-0 z-30 p-3">
      <div className="h-full p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">Add account</h2>
          <div
            onClick={() => forClose(false)}
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Account name
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter your Account name "
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => forClose(false)}
            className="flex-1"
            text=""
          >
            Cancel
          </Button>
          <Button
            onClick={createAccountHandle}
            variant="primary"
            className="flex-1"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default CreateAccount;
