const CryptoJS = require("crypto-js")
const decryptPassword = (encryptedPassword, secretKey)=> {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
const encryptoPassword = (data, key) =>{
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
}
module.exports = {
    decryptPassword,
    encryptoPassword,
}