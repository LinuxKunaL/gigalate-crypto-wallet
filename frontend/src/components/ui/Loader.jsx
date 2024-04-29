import React from "react";

function Loader({ variant }) {
  var className;

  if (variant === "primary") {
    className = "bg-onyx-800/50 backdrop-blur-xl";
  } else if (variant === "secondary") {
    className = "scale-80";
  }
  return (
    <div
      className={`${className} h-full z-20 top-0 bottom-0 flex justify-center items-center flex-col gap-3 w-full absolute`}
    >
      <div>
        <div className="spinner" />
      </div>
      <h3 className=" font-semibold text-white">Please wait !</h3>
    </div>
  );
}

export default Loader;
