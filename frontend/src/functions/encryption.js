import CryptoJS from "crypto-js";

const encryption = (text, key) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
  } catch (error) {
    console.log(error);
  }
};

const decryption = (encryptedText, key) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(
      CryptoJS.enc.Utf8
    );
    if (decrypted.length > 0) {
      return { success: true, data: decrypted };
    }
    return { success: false, data: "Password is wrong" };
  } catch (e) {
    return { success: false, data: "Password is wrong" };
  }
};

export { encryption, decryption };
