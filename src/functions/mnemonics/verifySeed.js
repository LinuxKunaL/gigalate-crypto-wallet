import { ethers } from "ethers";

const VerifySeed = async (mnemonic) => {
  try {
    ethers.HDNodeWallet.fromPhrase(mnemonic, null, "m/44'/60'/0'/0/0");
    return { success: true, message: "Phrase imported" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "invalid phrase" };
  }
};

export { VerifySeed };
