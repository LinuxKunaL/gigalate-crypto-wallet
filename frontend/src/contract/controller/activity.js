import accounts from "../../hooks/useAccounts";

const getActivityByAddress = async (userAccount) => {
  const { getUserAccountsDataByAddress } = accounts();

  const { transactionData } = getUserAccountsDataByAddress(userAccount);
};

export { getActivityByAddress };
