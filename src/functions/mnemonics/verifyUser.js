import { ethers } from "ethers";
import { decryption } from "../encryption";
import Cookies from "js-cookie";

/**
 * The `verifyUser` function checks for a key in cookies, decrypts a seed using the key, and navigates
 * to a lock page if any step fails.
 * @param Navigate - Navigate is a function that is used for navigating to different pages or routes
 * within a web application. In the context of the `verifyUser` function, it is being used to redirect
 * the user to the "/lock" page if certain conditions are not met during the verification process.
 * @returns The `verifyUser` function is returning a navigation to the "/lock" route if the conditions
 * are met.
 */

const verifyUser = (Navigate) => {
  const key = Cookies.get("gigalate.key");

  if (!key) {
   return Navigate("/lock");
  }

  const seedEncrypted = localStorage.getItem("gigalate.seedEncrypted");

  if (key) {
    const seedDecrypted = decryption(seedEncrypted, key);

    if (!seedDecrypted.success) {
      Cookies.remove("gigalate.key", { path: "/" });
      return Navigate("/lock");
    }

    const result = ethers.HDNodeWallet.fromPhrase(
      seedDecrypted.data,
      null,
      "m/44'/60'/0'/0/0"
    );

    if (!result.address) {
      Cookies.remove("gigalate.key", { path: "/" });
      return Navigate("/lock");
    }
  }
};

export { verifyUser };
