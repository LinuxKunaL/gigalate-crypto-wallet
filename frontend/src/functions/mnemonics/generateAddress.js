import { ethers } from "ethers";
import { decryption } from "../encryption";
import { VerifySeed } from "./verifySeed";
import Cookies from "js-cookie";

const generateAddress = async (index, Navigate) => {
  const seedEncrypted = localStorage.getItem("gigalate.seedEncrypted");

  const key = Cookies.get("gigalate.key");

  if (!seedEncrypted) {
    Navigate("/");
  }

  if (!key) {
    Navigate("/");
  }

  const mnemonic = decryption(seedEncrypted, key);

  if (mnemonic.success) {
    const isVerify = await VerifySeed(mnemonic.data);
    if (isVerify.success) {
      
      const result = ethers.HDNodeWallet.fromPhrase(
        mnemonic.data,
        null,
        `m/44'/60'/0'/0/${index}`
      );

      return result;
    } else {
      Navigate("/");
    }
  } else {
    Navigate("/");
  }
};

export { generateAddress };
