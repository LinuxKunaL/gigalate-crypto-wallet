import React, { useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import Button from "../../../../components/ui/Button";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
function SeedPhrase({ props }) {
  useEffect(() => {
    const seeds = ethers.Wallet.createRandom().mnemonic.phrase.split(" ");
    props?.setSeedPhrase(seeds);
  }, [ethers]);

  return (
    <div className="p-3 gap-3 flex flex-col w-full h-full justify-between items-center">
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center flex-col gap-1 p-3">
          <h2 className="text-white/90 font-semibold">
            Write Down Your Seed Phrase
          </h2>
          <p className="text-white/60 text-sm text-center">
            This is your seed phrase. Write it down on a paper and keep it in a
            safe place. You'll be asked to re-enter this phrase (in order) on
            the next step.
          </p>
        </div>
        <div className="flex items-center flex-wrap w-full gap-4 relative justify-center">
          {props?.seedPhrase.map((seed, index) => (
            <div
              key={index}
              className="flex-1 select-none text-sm py-1 px-2 bg-onyx-800/50 flex justify-center items-center text-white/70 rounded-lg"
            >
              {index + 1}.{seed}
            </div>
          ))}
          <div
            id="HideBox"
            className="flex justify-center flex-col items-center gap-2 absolute h-full w-full bg-onyx-900/30 backdrop-blur-sm"
          >
            <h1 className="text-white/90">Tap to reveal your seed phrase</h1>
            <p className="text-center text-white/60 text-sm">
              Make sure no one is watching your screen.
            </p>
            <Button
              variant="reddest"
              onClick={(e) => {
                document.getElementById("HideBox").classList.toggle("!hidden");
                document.getElementById("CopyButton").classList.toggle("!flex");
              }}
            >
              {" "}
              <div className="flex gap-1 items-center">
                <MdContentCopy />
                View
              </div>
            </Button>
          </div>
        </div>
        <Button
          onClick={() => navigator.clipboard.writeText(props?.seedPhrase)}
          variant="primary"
          id="CopyButton"
          className="hidden"
        >
          <div className="flex gap-1 items-center">
            <MdContentCopy />
            Copy
          </div>
        </Button>
      </div>
      <Link className="mb-5" to="/setup/createWallet/confirmSeedPhrase">
        <Button variant="primary">Continue</Button>
      </Link>
    </div>
  );
}

export default SeedPhrase;
