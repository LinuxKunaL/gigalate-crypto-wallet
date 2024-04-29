import React, { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import Button from "../../../components/ui/Button";
import Tooltip from "../../../components/ui/Tooltip";
import { IoIosClose } from "react-icons/io";
import { decryption } from "../../../functions/encryption";
import { Toaster, toastError } from "../../../app/Toasts";

function SecurityPrivacy() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="h-full flex flex-col gap-3 w-full ">
      <div className="flex p-3 justify-between items-center px-4">
        <h1 className="text-white/70">Security & privacy</h1>
        <Link
          to="/setting"
          className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
        >
          <RiArrowGoBackFill />
        </Link>
      </div>
      <div className="border-onyx-800 h-[75%] overflow-auto flex flex-col gap-6 border-t-[1px] p-4">
        <div className="flex flex-col gap-4">
          <span className="text-white/80 flex items-center gap-2">
            Security
            <Tooltip
              id="ExclamationForSecurity"
              content="Secret Recovery Phrase"
            >
              <FaCircleExclamation className="cursor-pointer" />
            </Tooltip>
          </span>
          <Button onClick={() => setIsVisible(true)} variant="secondary">
            Reveal Secret Recovery Phrase
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 flex items-center gap-2">
              IPFS gateway
              <Tooltip
                id="ExclamationForIPFS"
                content="Gigalate uses third-party services <br> to show images of your <br> NFTs stored on IPFS"
              >
                <FaCircleExclamation className="cursor-pointer" />
              </Tooltip>
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              placeholder="IPFS gateway URL"
            />
          </div>
        </div>
      </div>
      {isVisible ? <RevealSecretPhrase props={{ setIsVisible }} /> : null}
    </div>
  );
}

function RevealSecretPhrase({ props }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [recoveryPhrase, setRecoveryPhrase] = useState({
    isVisible: true,
    mnemonic: "that is dummy recovery phrase don't copy this mnemonic phrase",
  });

  const handleRevealPhrase = () => {
    if (!password) return toastError("Enter password!");

    const seedEncrypted = localStorage.getItem("gigalate.seedEncrypted");

    if (!seedEncrypted) return navigate("/");

    const mnemonic = decryption(seedEncrypted, password);

    if (mnemonic.success) {
      setRecoveryPhrase({
        isVisible: false,
        mnemonic: mnemonic.data,
      });
    } else {
      return toastError("password wrong!");
    }
  };

  return (
    <div className="h-full w-full absolute top-0 z-30 p-3">
      <Toaster position="top" />
      <div className="h-full p-4 gap-4 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <div>
            <h2 className="text-white/90 font-semibold text-lg">
              Reveal phrase
            </h2>{" "}
          </div>
          <div
            onClick={() => props.setIsVisible(false)}
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div>
          <h2 className=" text-white/70 font-semibold">
            Reveal recovery phrase
          </h2>
          <p className="text-xs text-onyx-300s text-yellow-400/80 animate-pulse">
            The Secret Recovery Phrase provides full access to your wallet and
            funds. Do not share this with anyone. gigalate Support will not
            request this,
          </p>
          <br />
          <p className="text-xs text-onyx-300s text-white/80 animate-pulse">
            Gigalate is a non-custodial wallet. That means you're the owner of
            your SRP.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-white/80 text-sm flex items-center gap-2">
            Your wallet password
          </span>
          <input
            type="text"
            className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
            placeholder="Enter password to continue"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleRevealPhrase} variant="primary">
          reveal SRP
        </Button>
        <div
          className={`${
            recoveryPhrase.isVisible
              ? "blur-md select-none pointer-events-none"
              : null
          } h-full w-full rounded-md bg-onyx-950 p-2 flex flex-col gap-2 justify-evenly`}
        >
          <p className="w-full text-white text-justify p-2 border-onyx-700/50  border-[1px] rounded-md">
            {recoveryPhrase.mnemonic}
          </p>
          <Tooltip
            id="mnemonicCopy"
            content="Copy to clipboard"
            place="bottom"
            AfterCLickContent={"copied"}
            className="w-full"
          >
            <Button
              onClick={() =>
                navigator.clipboard.writeText(recoveryPhrase.mnemonic)
              }
              variant="secondary"
              className="w-full"
            >
              Copy SRP
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
export default SecurityPrivacy;
