import { networkSetting } from "./setting";

const addTransaction = (data) => {
  const previousTransactionInString = localStorage.getItem(
    "gigalate.usersTransaction"
  );

  let previousTransactionInObject = [];
  if (previousTransactionInString !== null) {
    previousTransactionInObject = JSON.parse(previousTransactionInString);
  }

  previousTransactionInObject.push(data);

  localStorage.setItem(
    "gigalate.usersTransaction",
    JSON.stringify(previousTransactionInObject)
  );
};

const getTransactions = (address, sort = "all") => {
  const { chainId } = networkSetting();
  const previousTransactionInString = localStorage.getItem(
    "gigalate.usersTransaction"
  );

  if (chainId) {
    if (previousTransactionInString) {
      const previousTransactionInObject = JSON.parse(
        previousTransactionInString
      );

      const filterObject = previousTransactionInObject.filter(
        (tx) => tx.from === address || tx.to === address
      );

      const filterByChainId = filterObject.filter(
        (tx) => tx.chainId === chainId
      );

      const objectSortBy = filterByChainId.filter((tx) =>
        sort === "all" ? true : tx.type === sort
      );

      return objectSortBy;
    }
  }
  return [];
};

export { addTransaction, getTransactions };
