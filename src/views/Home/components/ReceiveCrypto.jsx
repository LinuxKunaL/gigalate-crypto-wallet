import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";

import html2canvas from "html2canvas";
import Button from "../../../components/ui/Button";
import useAccount from "../../../hooks/useAccounts";
import QRcode from "qrcode.react";
import Tooltip from "../../../components/ui/Tooltip";
import { Toaster } from "react-hot-toast";

function ReceiveCrypto() {
  const qrRef = useRef(null);
  const reloadEffect = useSelector((state) => state.reloadUseEffect);
  const { getCurrentAccount } = useAccount();
  const [accountAddress, setAccountAddress] = useState();

  useEffect(() => {
    setAccountAddress(getCurrentAccount().address);
  }, [getCurrentAccount, reloadEffect]);

  const handleDownloadQr = async () => {
    await html2canvas(qrRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, `${getCurrentAccount().address}.png`);
      });
    });
  };

  return (
    <div className="flex items-center gap-1 h-[33.5pc] flex-col">
      <Toaster position="top" />
      <div className="flex justify-between w-full items-center  p-4">
        <h1 className="font-semibold text-lg text-onyx-100">Receive</h1>
        <Link
          to="/home"
          className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
        >
          <IoIosClose />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-3 p-4">
        <div className="flex gap-3 flex-col justify-center items-center">
          <div ref={qrRef}>
            <QRcode
              className="h-[15pc] bg-white p-1 rounded-md"
              value={accountAddress}
            />
          </div>
          <Button onClick={handleDownloadQr} variant="secondary">
            Download
          </Button>
        </div>
      </div>
      <div className="border-onyx-800 border-t-[1px] h-full w-full p-4 flex flex-col">
        <div className="flex flex-col h-full justify-evenly items-center">
          <span className="p-2 block max-w-full break-words text-center bg-onyx-800/30 text-balance rounded-md text-white/60">
            {accountAddress}
          </span>
          <Tooltip
            id="userAddressCopy"
            content="Copy to clipboard"
            place="bottom"
            AfterCLickContent={"copied"}
          >
            <Button
              onClick={() =>
                navigator.clipboard.writeText(getCurrentAccount()?.address)
              }
              variant="primary"
            >
              <Link>Copy address</Link>
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default ReceiveCrypto;
