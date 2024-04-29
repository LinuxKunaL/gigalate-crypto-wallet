import NETWORK from "../utils/Networks.json";

const setDefaultSettingData = () => {
  const setting = localStorage.getItem("gigalate.setting");
  const settingNetwork = localStorage.getItem("gigalate.network");

  if (setting) return null;
  if (settingNetwork) return null;

  const network = NETWORK[0];

  const general = {
    currencyConversion: "USD",
    primaryCurrency: "ETH",
  };

  const advanced = {};

  const securityAndPrivacy = {};

  localStorage.setItem("gigalate.network", JSON.stringify(NETWORK));

  localStorage.setItem(
    "gigalate.setting",
    JSON.stringify({
      network,
      general,
      advanced,
      securityAndPrivacy,
    })
  );
};

const networkSetting = () => {
  const setting = localStorage.getItem("gigalate.setting");
  return JSON.parse(setting)?.network;
};
export { setDefaultSettingData, networkSetting };
