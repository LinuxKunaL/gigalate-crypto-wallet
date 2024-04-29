import React, { useEffect } from "react";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { VerifySeed } from "../../../../functions/mnemonics/verifySeed";
import { encryption } from "../../../../functions/encryption";
import { setInitialAccounts } from "../../../../functions/setAccountStates.js";

import Button from "../../../../components/ui/Button";
import Cookies from "js-cookie";
import useGenerateAvatar from "../../../../hooks/useGenerateAvatar.js";

function Congratulation({ props }) {
  const Navigate = useNavigate();
  const seedPhrase = props?.seedPhrase.toString().replace(/,/g, " ");
  const { generateAvatar } = useGenerateAvatar();

  useEffect(() => {
    createWallet();
    setInitialAccounts(generateAvatar, Navigate);
  }, []);

  const createWallet = async () => {
    const result = await VerifySeed(seedPhrase);

    if (result.success) {
      const encryptedSeed = encryption(
        seedPhrase,
        props?.password.confirmPassword
      );

      localStorage.setItem("gigalate.seedEncrypted", encryptedSeed);

      localStorage.setItem("gigalate.userCreated", true);

      Cookies.set("gigalate.key", props?.password.confirmPassword, {
        expires: 1 / 24,
      });
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="p-3 gap-3 flex flex-col w-full h-full justify-between items-center">
      <div className="flex flex-col gap-3 items-center">
        <TbDiscountCheckFilled className="h-20 w-20 bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-green-400 bg-clip-text" />
        <div className="flex items-center flex-col gap-1 p-3">
          <h2 className="text-white/90 font-semibold">Congratulations</h2>
        </div>
        <div className="flex bg-onyx-950 p-2 rounded-md items-center flex-wrap w-full gap-4 relative justify-center">
          <p className="text-white/60 text-sm text-center">
            You've successfully protected your wallet. Remember to keep your
            seed phrase safe, it's your responsibility!
          </p>
          <p className="text-white/60 text-sm text-center">
            Gigalate cannot recover your wallet should you lose it. You can find
            your seed phrase in Settings {">"} Security & Privacy You've
            successfully protected your wallet. Remember to keep your seed
            phrase safe, it's your responsibility!
          </p>
        </div>
      </div>
      <Link className="mb-5" to="/home">
        <Button variant="primary">Open</Button>
      </Link>
    </div>
  );
}

export default Congratulation;
