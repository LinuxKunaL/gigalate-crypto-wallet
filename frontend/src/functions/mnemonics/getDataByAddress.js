// shutdown function 💔 ❌

import { Mnemonic, ethers } from "ethers";
import { decryption } from "../encryption";
import { VerifySeed } from "./verifySeed";

const getDataByAddress = async (address, key) => {
  if (!address) return null;

  if (!key) return null;

  const seedEncrypted = localStorage.getItem("gigalate.seedEncrypted");

  if (!seedEncrypted) return null;

  const mnemonic = decryption(seedEncrypted, key);

  if (mnemonic.success) {

    const result = ethers.HDNodeWallet.fromPhrase(
      mnemonic.data,
      null,
      "m/44'/60'/0'/0/2"
    );

    // ethers.HDNodeWallet.

    //   return result;

    console.log(result);
    
  } else {
    return mnemonic.data;
  }

  //   console.log(mnemonic);
};

export { getDataByAddress };
