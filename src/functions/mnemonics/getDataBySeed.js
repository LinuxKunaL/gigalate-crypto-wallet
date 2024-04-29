import { ethers } from "ethers";
import { decryption } from "../encryption";
import { VerifySeed } from "./verifySeed";
import Cookies from "js-cookie";

const seedData = async (Navigate) => {
  const seedEncrypted = localStorage.getItem("gigalate.seedEncrypted");

  const key = Cookies.get("gigalate.key");

  if (!seedEncrypted) {
    return Navigate("/");
  }

  if (!key) {
    Cookies.remove("gigalate.key", { path: "/" });
    return Navigate("/lock");
  }

  const mnemonic = decryption(seedEncrypted, key);

  if (mnemonic.success) {
    const isVerify = await VerifySeed(mnemonic.data);
    if (isVerify.success) {
      const result = ethers.HDNodeWallet.fromPhrase(
        mnemonic.data,
        null,
        "m/44'/60'/0'/0/0"
      );
      return result;
    } else {
      Cookies.remove("gigalate.key", { path: "/" });
      return Navigate("/");
    }
  } else {
    Cookies.remove("gigalate.key", { path: "/" });
    return Navigate("/");
  }
};

export { seedData };
