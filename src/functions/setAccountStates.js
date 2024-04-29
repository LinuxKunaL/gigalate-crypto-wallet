import { toastError } from "../app/Toasts";
import { getBalance } from "../contract/controller/token";
import { setAccountState } from "../app/redux/Slice";
import { encryption } from "../functions/encryption.js";
import { verifyUser } from "../functions/mnemonics/verifyUser.js";
import { seedData } from "../functions/mnemonics/getDataBySeed.js";

import Cookies from "js-cookie";
import store from "../app/redux/Store";

const getCurrentAccount = () => {
  const userAccountsString = localStorage.getItem("gigalate.userAccounts");
  const userAccounts = JSON.parse(userAccountsString);

  if (!userAccounts) return null;

  const currentUserAccount = userAccounts?.find(
    (account) => account.isMain === true
  );

  return currentUserAccount;
};

const setAccountStates = async () => {
  if (getCurrentAccount() === null) return null;
  const { address } = getCurrentAccount();
  const response = await getBalance(address);

  if (response?.success) {
    store.dispatch(
      setAccountState({
        address: address,
        balance: response?.balance,
      })
    );
  }

  if (!response?.success) {
    toastError(response?.message);
  }
};

const setInitialAccounts = async (generateAvatar, navigate) => {
  await verifyUser(navigate);
  const data = await seedData(navigate);
  if (!data) return null;

  const userAccountsData = localStorage.getItem("gigalate.userAccounts");
  const key = Cookies.get("gigalate.key");

  if (!userAccountsData) {
    localStorage.setItem(
      "gigalate.userAccounts",
      JSON.stringify([
        {
          index: data?.index,
          address: data?.address,
          accountName: "Main account",
          avatar: generateAvatar(),
          crypto: { symbol: "", icon: "" },
          isMain: true,
          encryptedPrivateKey: encryption(data?.privateKey, key),
          NFTs: [],
          tokens: [],
          transactionData:[]
        },
      ])
    );
  }
};

export { setAccountStates, setInitialAccounts };
