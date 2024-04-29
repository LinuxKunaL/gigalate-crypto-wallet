import { contractInstance, ethersInstance, ethers } from "../util/Contract";
import tokenAbi from "../util/TOKEN.ABI.json";
import NFTAbi from "../util/NFT.json";
import accounts from "../../hooks/useAccounts";

const getActivityByAddress = async (userAccount, type, tokenAddress) => {
  const { getUserAccountsDataByAddress } = accounts();

  const { transactionData } = getUserAccountsDataByAddress(userAccount);

  return;
  console.log(transactionData);

  // try {
  //   const getTokenEventData = async (filter) => {
  //     if (!userAccount?.tokens) return [];

  //     const eventResults = await Promise.all(
  //       userAccount?.tokens?.map(async (token) => {
  //         const tokenContract = new ethers.Contract(
  //           tokenAbi,
  //           token.contractAddress
  //         );
  //         // const tokenContract = new ethersInstance.eth.Contract(
  //         //
  //         // );
  //         const result = await tokenContract.getPastEvents("Transfer", {
  //           filter,
  //           fromBlock: 0,
  //           toBlock: "latest",
  //         });
  //         return result.map((data) => {
  //           return {
  //             tx: "token",
  //             symbol: token.symbol,
  //             transactionHash: data.transactionHash,
  //             amount: Number(
  //               ethersInstance.utils.fromWei(data.returnValues.value, "ether")
  //             ),
  //             contractAddress: token.contractAddress,
  //             sender: data.returnValues.from,
  //             receiver: data.returnValues.to,
  //             time: Number(data.returnValues.time) || "",
  //           };
  //         });
  //       })
  //     );

  //     return eventResults.flat();
  //   };

  //   const getNFTsEventData = async (filter) => {
  //     if (!userAccount?.NFTs) return [];

  //     const eventResults = await Promise.all(
  //       userAccount?.NFTs?.map(async (NFT) => {
  //         const NftContract = new ethers.Contract(NFTAbi, NFT.contractAddress);
  //         const result = await NftContract.getPastEvents("Transfer", {
  //           filter,
  //           fromBlock: 0,
  //           toBlock: "latest",
  //         });

  //         return result.map((data) => {
  //           return {
  //             tx: "nft",
  //             symbol: NFT.symbol,
  //             transactionHash: data.transactionHash,
  //             amount: "0",
  //             contractAddress: NFT.contractAddress,
  //             sender: data.returnValues.from,
  //             receiver: data.returnValues.to,
  //             time: Number(data.returnValues.time) || "",
  //           };
  //         });
  //       })
  //     );

  //     return eventResults.flat();
  //   };

  //   const getEventData = async (filter) => {
  //     const eventData = await contractInstance.getPastEvents("ETHsend", {
  //       filter,
  //       fromBlock: 0,
  //       toBlock: "latest",
  //     });

  //     return eventData.map((data) => {
  //       return {
  //         tx: "crypto",
  //         symbol: "ETH",
  //         transactionHash: data.transactionHash,
  //         amount: Number(ethers.formatEther(data.returnValues.amount)),
  //         sender: data.returnValues.sender,
  //         receiver: data.returnValues.receiver,
  //         time: Number(data.returnValues.time),
  //       };
  //     });
  //   };

  //   const eventDataPromises = [
  //     getEventData({ sender: userAccount.address }),
  //     getEventData({ receiver: userAccount.address }),
  //     getTokenEventData({ from: userAccount.address }),
  //     getTokenEventData({ to: userAccount.address }),
  //     getNFTsEventData({ to: userAccount.address }),
  //     getNFTsEventData({ from: userAccount.address }),
  //   ];

  //   const allEventData = await Promise.all(eventDataPromises);

  //   if (type === "token") {
  //     return allEventData
  //       .flat()
  //       .filter((token) => token.contractAddress === tokenAddress);
  //   }

  //   return allEventData.flat();
  // } catch (error) {
  //   console.log(error);
  // }
};

export { getActivityByAddress };
