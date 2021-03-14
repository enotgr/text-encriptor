"use strict";

class TextEncryptor {
  static encryptText(str, key) {
    return this._encrypt(str, key);
  }

  static decryptText(str, key) {
    return this._encrypt(str, key, true);
  }

  static _encrypt(str, key, decrypt = false) {
    const chCodeOffset = 96;
    const minChCode = 32;
    const maxChCode = 126;

    let codes = [];
    let j = 0;

    for (let i = 0; i < str.length; i++) {
      if (j >= key.length) {
        j = 0;
      }

      const keyChCode = key.charCodeAt(j);

      let chCode = str.charCodeAt(i);

      j++;

      if (decrypt) {
        chCode -= keyChCode - chCodeOffset;
      } else {
        chCode += keyChCode - chCodeOffset;
      }

      if (chCode < minChCode) {
        chCode += chCodeOffset - 1;
      }

      if (chCode > maxChCode) {
        chCode -= chCodeOffset - 1;
      }

      codes.push(chCode);
    }
    return String.fromCharCode(...codes);
  }
}
