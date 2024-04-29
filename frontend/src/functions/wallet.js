import { ethers } from "ethers";
import { decryption } from "./encryption";
import { ethersInstance } from "../contract/util/Contract";
import Accounts from "../hooks/useAccounts";
import Cookies from "js-cookie";

const accounts = Accounts();
const { getUserAccountsDataByAddress } = accounts;

const wallet = (_address) => {
  const { encryptedPrivateKey } = getUserAccountsDataByAddress(_address);
  const key = Cookies.get("gigalate.key") || "demo";
  const { success, data } = decryption(encryptedPrivateKey, key);

  if (success) {
    return new ethers.Wallet(data, ethersInstance);
  } else {
    console.log(data);
  }
};

export default wallet;
