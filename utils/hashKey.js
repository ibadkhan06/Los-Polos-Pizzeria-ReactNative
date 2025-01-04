import CryptoJS from 'crypto-js';

const generateHash = (obj) => {
  const jsonString = JSON.stringify(obj);
  return CryptoJS.SHA256(jsonString).toString(CryptoJS.enc.Hex);
};

export default generateHash;