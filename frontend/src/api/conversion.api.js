import axios from "axios";

const conversion = async (amount) => {
  const settingString = localStorage.getItem("gigalate.setting");
  const settingObject = settingString ? JSON.parse(settingString) : {};
  const { general = {}, network = {} } = settingObject;
  const { currencyConversion } = general;
  const { networkName } = network;

  var convertId = 2781;
  var currencySymbol = "$";
  var networkConvertId = 1027;

  switch (currencyConversion) {
    case "INR":
      convertId = 2796;
      currencySymbol = "₹";
      break;

    case "USD":
      convertId = 2781;
      currencySymbol = "$";
      break;

    case "EUR":
      convertId = 2790;
      currencySymbol = "€";
      break;

    case "PKR":
      convertId = 2804;
      currencySymbol = "₨";
      break;

    case "JPY":
      convertId = 2797;
      currencySymbol = "¥";
      break;

    default:
      convertId = 2781;
      currencySymbol = "$";
      break;
  }

  switch (networkName) {
    case "Polygon":
      networkConvertId = 3890;
      break;

    case "Ethereum":
      networkConvertId = 1027;
      break;

    default:
      networkConvertId = 1027;
      break;
  }

  // return {
  //   amount: "0,000,000",
  //   currencySymbol,
  // };

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const apiUrl = `https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=${amount}&convert_id=${convertId}&id=${networkConvertId}`;

  try {
    const res = await axios.get(proxyUrl + apiUrl);

    // const res = await axios.post("http://localhost:60/api/conversion", {
    //   amount,
    //   convertId,
    //   networkConvertId,
    // });

    const convertAmount = res?.data?.data?.quote[0].price;

    return {
      amount: Number(convertAmount).toLocaleString(),
      currencySymbol,
    };
  } catch (error) {
    return {
      amount: "0,000,000",
      currencySymbol,
    };
  }
};

export { conversion };
