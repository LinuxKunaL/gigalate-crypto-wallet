import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import grid from "../../assets/images/grid.svg";
import AnimatedLogo from "../../assets/images/AnimatedLogo";
import Button from "../../components/ui/Button";

function Splash() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("gigalate.userCreated") === "true" &&
      localStorage.getItem("gigalate.seedEncrypted")
    ) {
      return Navigate("/home");
    } else {
      return Navigate("/");
    }
  }, [Navigate]);

  return (
    <div className="h-full flex justify-center">
      <img className="w-full absolute" src={grid} alt="" />
      <div className="flex flex-1 flex-col gap-7 justify-center items-center h-">
        <AnimatedLogo className=" h-[6pc] z-20" />
        <h1 className="text-2xl bg-gradient-to-r from-onyx-100 font-semibold to-onyx-500 text-transparent bg-clip-text drop-shadow-lg ">
          Gigalate
        </h1>
        <Button variant="primary">
          <Link to="setup">Start Wallet</Link>
        </Button>
      </div>
    </div>
  );
}

export default Splash;
