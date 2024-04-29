import { ethersInstance } from "../contract/util/Contract";

const handleShowTransactionData = async (
  hash,
  from,
  to,
  value,
  type,
  address
) => {
  try {
    const { gasUsed } = await ethersInstance.getTransactionReceipt(hash);

    const { nonce, gasLimit, gasPrice, maxPriorityFeePerGas, maxFeePerGas } =
      await ethersInstance.getTransaction(hash);

    const transaction = from === address ? "Send" : "Receive";

    return {
      popup: true,
      data: {
        gasLimit,
        from,
        to,
        nonce,
        value,
        type,
        gasUsed,
        hash,
        gasPrice,
        transaction,
        maxFeePerGas,
        maxPriorityFeePerGas,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export { handleShowTransactionData };
