import { increase } from "../app/redux/Slice";
import store from "../app/redux/Store";
import { getBalance } from "../contract/controller/token";

function useAccounts() {
  const userAccountsString = localStorage.getItem("gigalate.userAccounts");
  const userAccounts = JSON.parse(userAccountsString);

  const userAccountsData = () => {
    return userAccounts;
  };

  const getUsersAccounts = async () => {
    if (!userAccounts) {
      return [];
    }

    const modifiedData = await Promise.all(
      userAccounts.map(async (data) => {
        const { balance } = await getBalance(data.address);
        return {
          ...data,
          balance: balance,
        };
      })
    );

    modifiedData.sort((a, b) => a.index - b.index);

    return modifiedData;
  };

  const getUserAccountsDataByAddress = (address) => {
    if (!userAccounts) return null;

    const foundUser = userAccounts?.find(
      (account) => account.address === address
    );

    if (foundUser) return foundUser;

    return "user not found";
  };

  const getCurrentAccount = () => {
    if (!userAccounts) return null;

    const currentUserAccount = userAccounts?.find(
      (account) => account.isMain === true
    );

    return currentUserAccount;
  };

  const deleteAccountById = (id) => {
    const modifiedAccount = userAccounts.filter(
      (account) => account?.index !== id
    );

    localStorage.setItem(
      "gigalate.userAccounts",
      JSON.stringify(modifiedAccount)
    );

    store.dispatch(increase(+1));
    return true;
  };

  const modifiedAccountByAddress = (object, id, key) => {
    const accountObject = userAccounts.find((account) => account?.index === id);

    deleteAccountById(id);

    var userAccountsStrings = localStorage.getItem("gigalate.userAccounts");
    var userAccount = JSON.parse(userAccountsStrings);

    accountObject[key].push(object);

    userAccount.push(accountObject);

    localStorage.setItem("gigalate.userAccounts", JSON.stringify(userAccount));
  };

  return {
    userAccountsData,
    getUsersAccounts,
    getCurrentAccount,
    deleteAccountById,
    getUserAccountsDataByAddress,
    modifiedAccountByAddress,
  };
}

export default useAccounts;
