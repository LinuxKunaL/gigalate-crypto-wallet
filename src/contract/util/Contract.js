
import { ethers } from "ethers";
import { setDefaultSettingData } from "../../functions/setting";

var ethersInstance, contractInstance, contractAddress;

const contractLoad = async () => {
  setDefaultSettingData();

  const settingObjectString = localStorage.getItem("gigalate.setting");
  const settingObject = JSON.parse(settingObjectString);

  try {
    ethersInstance = new ethers.JsonRpcProvider(settingObject?.network?.rpcUrl);
    contractAddress = settingObject?.network?.contractAddress;
  } catch (error) {
    console.log(error);
  }
};

contractLoad();

export {
  ethersInstance,
  ethers,
  contractInstance,
  contractAddress,
  contractLoad,
};
