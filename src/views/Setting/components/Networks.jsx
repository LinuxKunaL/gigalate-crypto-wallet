import React, { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosClose, IoMdSettings } from "react-icons/io";
import { contractLoad, ethers } from "../../../contract/util/Contract";
import { networkSetting } from "../../../functions/setting";
import { toastSuccess, Toaster, toastError } from "../../../app/Toasts";

import Button from "../../../components/ui/Button";
import Tooltip from "../../../components/ui/Tooltip";

function Networks() {
  const [selectedNetwork, setSelectedNetwork] = useState();
  const [loadSetting, setLoadSetting] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [listNetworks, setListNetworks] = useState([]);
  const [openNetworkList, setOpenNetworkList] = useState();
  const [loadNetworkData, setLoadNetworkData] = useState(0);

  useEffect(() => {
    fetchingSetting();
  }, [networkSetting, loadSetting]);

  useEffect(() => {
    const networksListString = localStorage.getItem("gigalate.network");
    const networksListObject = JSON.parse(networksListString);
    setListNetworks(networksListObject);
  }, [loadNetworkData]);

  const fetchingSetting = () => {
    setSelectedNetwork(networkSetting()?.index);
  };

  const handleChangeNetwork = (net) => {
    const settingObjectString = localStorage.getItem("gigalate.setting");
    const settingObject = JSON.parse(settingObjectString);

    settingObject.network = net;
    localStorage.setItem("gigalate.setting", JSON.stringify(settingObject));
    setLoadSetting((pre) => pre + 1);
    contractLoad();
  };

  const openNetworkSetting = (net) => {
    setOpenNetworkList(net);
    setIsVisible(true);
  };

  const openAddNetworkSetting = () => {
    setOpenNetworkList();
    setIsVisible(true);
  };

  return (
    <div className="h-full flex flex-col gap-3 w-full ">
      <Toaster position="top" />
      <div className="flex p-3 justify-between items-center px-4">
        <h1 className="text-white/70">Networks</h1>
        <Link
          to="/setting"
          className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900 active:scale-95"
        >
          <RiArrowGoBackFill />
        </Link>
      </div>
      <div className="border-onyx-800 h-[75%] overflow-auto flex flex-col gap-6 border-t-[1px]">
        <div className="flex px-4 pt-4 flex-col gap-2">
          <ul className="flex flex-col gap-3">
            {listNetworks?.map((net, index) => (
              <div
                key={index}
                className={`${
                  selectedNetwork === net.index
                    ? "border-[1px] !border-onyx-700/50 bg-onyx-950/50"
                    : null
                } flex relative justify-between select-none border-[1px] border-transparent cursor-pointer hover:bg-onyx-950/50 rounded-lg p-1 gap-2 items-center`}
              >
                <div
                  onClick={() => handleChangeNetwork(net)}
                  className="flex w-full gap-2 items-center justify-start"
                >
                  <div className="size-10 overflow-hidden rounded-lg bg-white flex justify-center items-center">
                    {net.icon ? (
                      <img src={net.icon} className="" alt="" />
                    ) : (
                      <div className="flex justify-center items-center uppercase text-indigo-500 text-center font-semibold text-lg h-full w-full bg-onyx-800">
                        {net.networkName.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <span className=" text-onyx-200 text-sm">
                    {net.networkName}
                  </span>
                </div>
                {net.index > 2 ? (
                  <div
                    onClick={() => openNetworkSetting(net)}
                    className="text-white/70 mr-3"
                  >
                    <IoMdSettings />
                  </div>
                ) : null}
              </div>
            ))}
          </ul>
        </div>
        <div className="bottom-0 rounded-t-mdg border-t-[1px] border-onyx-800 absolute w-full bg-onyx-950 p-5 flex justify-between items-center">
          <Button
            className="w-full"
            variant="secondary"
            onClick={openAddNetworkSetting}
          >
            <div className="flex gap-4 h-8 items-center">
              <IoMdPersonAdd /> Add a network
            </div>
          </Button>
        </div>
      </div>
      {isVisible ? (
        <AddNetwork
          props={{
            setIsVisible: setIsVisible,
            openNetworkList,
            setLoadNetworkData,
          }}
        />
      ) : null}
    </div>
  );
}

function AddNetwork({ props }) {
  const [formNetwork, setFormNetwork] = useState({
    index: props?.openNetworkList?.index,
    networkName: props?.openNetworkList?.networkName,
    rpcUrl: props?.openNetworkList?.rpcUrl,
    chainId: props?.openNetworkList?.chainId,
    symbol: props?.openNetworkList?.symbol,
    blockExplorerUrl: props?.openNetworkList?.blockExplorerUrl,
  });
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  useEffect(() => {
    if (props?.openNetworkList) {
      handleVerifyRPC(props?.openNetworkList.rpcUrl);
    }
  }, []);

  const handleOnChange = async (e) => {
    setFormNetwork((pre) => ({ ...pre, [e.target.name]: e.target.value }));

    if (e.target.name === "rpcUrl") {
      try {
        const networkInstance = new ethers.JsonRpcProvider(e.target.value);
        const chainId = parseInt((await networkInstance.getNetwork()).chainId);
        const networkName = (await networkInstance.getNetwork()).name;
        setFormNetwork({
          ...formNetwork,
          rpcUrl: e.target.value,
          chainId: chainId,
          networkName: networkName,
        });
        setIsButtonDisable(true);
      } catch (error) {
        setFormNetwork({
          ...formNetwork,
          chainId: "",
          networkName: "",
        });
        setIsButtonDisable(false);
      }
    }
  };

  const handleVerifyRPC = async (url) => {
    try {
      const networkInstance = new ethers.JsonRpcProvider(url);

      await networkInstance.getNetwork().chainId;
      await networkInstance.getNetwork().name;

      setIsButtonDisable(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSaveNetwork = async () => {
    if (!formNetwork.networkName) return toastError("Enter network name");

    if (!formNetwork.chainId) return toastError("Enter network chainId");

    if (!formNetwork.symbol) return toastError("Enter network symbol");

    // if (!formNetwork.blockExplorerUrl)
    //   return toastError("Enter block explorer url");

    if (formNetwork.blockExplorerUrl.includes("http") === false)
      return toastError("Enter valid url");

    const networkString = localStorage.getItem("gigalate.network");
    const networkObject = JSON.parse(networkString);

    if (props?.openNetworkList) {
      const currentObject = networkObject.filter(
        (net) => net.index !== props?.openNetworkList?.index
      );

      currentObject.push(formNetwork);

      localStorage.setItem("gigalate.network", JSON.stringify(currentObject));

      props?.setLoadNetworkData((pre) => pre + 1);
      props?.setIsVisible(false);
    } else {
      networkObject.push({
        ...formNetwork,
        index: networkObject[networkObject.length - 1].index + 1,
      });

      localStorage.setItem("gigalate.network", JSON.stringify(networkObject));

      toastSuccess("Network added!");

      props?.setLoadNetworkData((pre) => pre + 1);
      props?.setIsVisible(false);
    }
  };

  const deleteNetwork = () => {
    const networkString = localStorage.getItem("gigalate.network");
    const networkObject = JSON.parse(networkString);

    const currentObject = networkObject.filter(
      (net) => net.index !== props?.openNetworkList?.index
    );

    localStorage.setItem("gigalate.network", JSON.stringify(currentObject));

    toastSuccess("Network deleted!");

    props?.setLoadNetworkData((pre) => pre + 1);
    props?.setIsVisible(false);
  };

  return (
    <div className="h-full bg-onyx-900/60  w-full absolute top-0 z-30 p-3">
      <div className="p-4 gap-6 flex flex-col  rounded-xl w-full bg-onyx-900 backdrop-blur-md shadow-massive-2">
        <div className="flex gap-3 justify-between items-center ">
          <h2 className="text-white/90 font-semibold text-lg">Add Network</h2>{" "}
          <div
            onClick={() => props?.setIsVisible(false)}
            className="inline-flex cursor-pointer items-center justify-center h-9 w-9  flex-col gap-1 text-base  text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900"
          >
            <IoIosClose />
          </div>
        </div>
        <div className="overflow-auto flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Network name
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              placeholder="Enter Network name"
              name="networkName"
              onChange={handleOnChange}
              value={formNetwork?.networkName}
              defaultValue={props?.openNetworkList?.networkName}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              New RPC URL
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              placeholder="Enter RPC URL"
              name="rpcUrl"
              onChange={handleOnChange}
              defaultValue={props?.openNetworkList?.rpcUrl}
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-1 flex-col gap-4">
              <span className="text-white/80 text-sm flex items-center gap-2">
                Chain ID
                <Tooltip
                  id="ExclamationForChain"
                  content="The chain ID, essential for <br> transaction signing, needs to<br>  correspond with the network's <br> chain ID. You can input a decimal<br>  or hexadecimal number prefixed<br>  with '0x', though it will  be displayed<br> in decimal format."
                >
                  <FaCircleExclamation className="cursor-pointer" />
                </Tooltip>
              </span>
              <input
                type="number"
                className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
                placeholder="Enter Chain id"
                name="chainId"
                onChange={handleOnChange}
                value={formNetwork.chainId}
                disabled={formNetwork?.chainId ? true : false}
                defaultValue={props?.openNetworkList?.chainId}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <span className="text-white/80 text-sm flex items-center gap-2">
                Currency symbol
              </span>
              <input
                type="text"
                className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
                placeholder="Enter Symbol"
                name="symbol"
                onChange={handleOnChange}
                defaultValue={props?.openNetworkList?.symbol}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              Block explorer URL{" "}
              <b className=" font-normal text-white/40">(Optional)</b>
            </span>
            <input
              type="text"
              className="w-full px-5 py-2 text-onyx-400/80 bg-onyx-950/50 border-[1px] outline-none border-onyx-700/50 hover:border-indigo-500/50 transition-all shadow-massive-2as rounded-md"
              placeholder="Enter Block explorer URL"
              name="blockExplorerUrl"
              onChange={handleOnChange}
              defaultValue={props?.openNetworkList?.blockExplorerUrl}
            />
          </div>
        </div>
        <div className="flex gap-3">
          {props?.openNetworkList ? (
            <Button
              onClick={deleteNetwork}
              variant="reddest"
              className="flex-1"
            >
              Delete
            </Button>
          ) : null}
          <Button
            variant="secondary"
            onClick={() => props?.setIsVisible(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          {isButtonDisable ? (
            <Button
              onClick={handleSaveNetwork}
              variant="primary"
              className="flex-1"
            >
              Save
            </Button>
          ) : (
            <Button className="flex-1" variant="disable">
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Networks;
