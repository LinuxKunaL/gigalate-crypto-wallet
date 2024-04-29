const formatAddress = (address) => {
  if (address) {
    const format = `${address.slice(0, 5)}...${address.slice(38)}`;
    return format;
  }
  return "0x000..0000";
};

export { formatAddress };
