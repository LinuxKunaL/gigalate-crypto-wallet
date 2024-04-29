import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import { toastError, Toaster } from "../../../../app/Toasts";

function ConfirmSeedPhrase({ props }) {
  const [isVerifySeed, setIsVerifySeed] = useState(false);
  const [seeds, setSeed] = useState();
  var tempSeedForVerify = [];

  useEffect(() => {
    const seedObjects = props?.seedPhrase.map((seed, index) => ({
      index: index + 1,
      seed,
    }));
    for (let i = seedObjects.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [seedObjects[i], seedObjects[j]] = [seedObjects[j], seedObjects[i]];
    }
    setSeed(seedObjects.slice(3, 7));
  }, [props?.seedPhrase]);

  const verifySeedPhrase = (seed, index) => {
    if (tempSeedForVerify.length === 4)
      return toastError("verification failed clear the seed !");

    tempSeedForVerify.push({ index, seed });

    if (
      JSON.stringify(seeds.sort((a, b) => a.index - b.index)) ===
      JSON.stringify(tempSeedForVerify.sort((a, b) => a.index - b.index))
    ) {
      return setIsVerifySeed(true);
    }
  };

  const clearTempSeed = () => {
    tempSeedForVerify.splice(0, tempSeedForVerify.length);
    [0, 1, 2, 3].map(
      (i) => (document.getElementById(`seedPlace-${i}`).innerHTML = " ")
    );
  };

  return (
    <div className="p-3 gap-3 flex flex-col w-full h-full justify-between items-center">
      <Toaster position="top" />
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center flex-col gap-1 p-3">
          <h2 className="text-white/90 font-semibold">Confirm Seed Phrase</h2>
        </div>
        <div className="flex bg-onyx-950 p-2 rounded-md items-center flex-wrap w-full gap-4 relative justify-center">
          <p className="text-white/80 text-sm text-center">
            Select each word in the order it was presented to you
          </p>
          <div className="flex flex-wrap p-3 justify-center gap-4">
            {seeds?.map((seed, index) => (
              <div
                key={index}
                data-index={seed.index}
                className="select-none seedPlace rounded-md text-sm h-[2.4pc] w-[7pc] bg-onyx-800/50 flex justify-center items-center text-white/90 outline-none relative"
                onDrop={(e) => {
                  e.target.innerText = e.dataTransfer.getData("text/plain");
                  verifySeedPhrase(
                    e.dataTransfer.getData("text/plain"),
                    seed.index
                  );
                }}
                id={`seedPlace-${index}`}
                onDragOver={(e) => e.preventDefault()}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {seeds?.map((seed, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", e.target.innerText)
              }
              onDragOver={(e) => e.preventDefault()}
              className="select-none text-sm h-[2.4pc] w-[7pc] bg-onyx-800/50 flex justify-center items-center text-white/70 rounded-lg"
            >
              {seed?.seed}
            </div>
          ))}
        </div>
      </div>
      <div className="flex mb-5 gap-3 items-center w-60">
        <Button onClick={clearTempSeed} className="flex-1" variant="secondary">
          Clear
        </Button>
        {isVerifySeed ? (
          <Link className="flex-1" to="/setup/createWallet/congratulation">
            <Button variant="primary">Continue</Button>
          </Link>
        ) : (
          <Button className="flex-1" variant="disable">
            Continue
          </Button>
        )}{" "}
      </div>
    </div>
  );
}

export default ConfirmSeedPhrase;
