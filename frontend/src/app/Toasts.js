import toast, { Toaster } from "react-hot-toast";

const toastSuccess = (message) => {
  return toast.success(message, {
    style: {
      padding: "10px",
      fontSize: "0.9rem",
      color: "#fff",
      background: "#1c1b22ad",
      backdropFilter: "blur(10px)",
      borderRight: "1px solid #68f163ad",
    },
    iconTheme: {
      primary: "#68f163",
      secondary: "#1c1b22",
    },
  });
};

const toastError = (message) => {
    return toast.error(message, {
      style: {
        padding: "10px",
        fontSize: "0.9rem",
        color: "#fff",
        background: "#1c1b22ad",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid #e14c4cad",
      },
      iconTheme: {
        primary: "#e14c4c",
        secondary: "#1c1b22",
      },
    });
  };

export { toastSuccess,toastError, Toaster };
