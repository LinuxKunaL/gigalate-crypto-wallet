import React from "react";

function Button({ variant, children, onClick, className, id }) {
  let buttonClass;

  if (variant === "primary") {
    buttonClass = `${className} inline-flex items-center justify-center px-5 py-2 text-sm text-center duration-500 ease-in-out transform text-white rounded-xl bg-gradient-to-tr shadow-massive-2 from-indigo-500 via-indigo-400 to-indigo-300 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-onyx-900 focus:ring-offset-2 focus:ring-indigo-300 hover:shadow-none`;
  } else if (variant === "secondary") {
    buttonClass = `${className} inline-flex items-center justify-center  px-5 py-2 text-sm text-center text-onyx-300 duration-500 ease-in-out transform border border-onyx-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 hover:shadow-none focus:ring-offset-onyx-900`;
  } else if (variant === "Tertiary") {
    buttonClass = `${className} inline-flex items-center justify-center px-5 py-2 text-sm text-center text-onyx-300 duration-500 ease-in-out transform bg-onyx-800 rounded-xl focus:outline-none focus:ring-2 hover:text-blue-300 focus:ring-offset-2 focus:ring-onyx-300 focus:ring-offset-onyx-900 shadow-massive-2 hover:shadow-none`;
  } else if (variant === "reddest") {
    buttonClass = `${className} inline-flex items-center justify-center  px-5 py-2 text-sm text-center text-red-400/90 duration-500 ease-in-out transform border border-red-800 bg-onyx-900 rounded-xl shadow-massive-2 focus:outline-none focus:ring-2 hover:text-red-500 focus:ring-offset-2 focus:ring-onyx-700 hover:shadow-none focus:ring-offset-onyx-900`;
  } else if (variant === "disable") {
    buttonClass = `${className} inline-flex items-center cursor-not-allowed justify-center px-5 py-2 text-sm text-center text-onyx-300 duration-500 ease-in-out transform bg-onyx-800 rounded-xl focus:outline-none focus:ring-2 hover:text-indigo-500 focus:ring-offset-2 focus:ring-onyx-300 focus:ring-offset-onyx-900 shadow-massive-2 hover:shadow-none`;
  }

  return (
    <button id={id} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
