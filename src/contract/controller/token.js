import { decryption } from "../../functions/encryption";
import { contractInstance, ethersInstance } from "../util/Contract";
import { ethers } from "ethers";
import Wallet from "../../functions/wallet";

const getBalance = async (_address) => {
  if (!_address)
    return {
      balance: 0,
      success: false,
    };
  try {
    const balance = await ethersInstance?.getBalance(_address);
    const balanceEth = ethers.formatEther(balance);
    return {
      balance: balanceEth,
      success: true,
    };
  } catch (error) {
    if (error.message === "Address is required to fetch balance.") {
      return {
        success: true,
      };
    }
    return {
      success: false,
      message: "Failed to fetch balance: " + error.message,
    };
  }
};

const getGas = async (_receiver, _amount, _sender) => {
  const amountInWei = ethers.parseUnits(_amount, "ether");

  const txParams = {
    from: _sender,
    to: _receiver,
    value: amountInWei,
    gasLimit: 30000,
  };

  const gasEstimate = await ethersInstance.estimateGas(txParams);

  return ethers.formatUnits(Number(gasEstimate), "wei");
};

const transfer = async (_amount, _receiver, _sender, getPrivateKey) => {
  const wallet = Wallet(_sender);

  const tx = {
    to: _receiver,
    value: ethers.parseEther(_amount),
  };

  const sendTransaction = async () => {
    try {
      const transactionData = await wallet.sendTransaction(tx);

      return {
        success: true,
        message: "Transaction successful 🎉",
        transactionData,
      };
    } catch (error) {
      console.log("Error transferring ETH:", error);
      return {
        success: false,
        message: error.message || error.toString(),
      };
    }
  };

  try {
    return await sendTransaction();
  } catch (error) {
    console.log(error);
  }
};

export { getBalance, transfer, getGas };
