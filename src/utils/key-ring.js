import { AES, enc, HmacSHA512 } from "crypto-js";

const IV = Date.now().toString();
const CONSOLE_SUCCESS_LABEL_STYLE =
  "background: #606060; color: #fff; border-radius: 3px 0 0 3px;";
const CONSOLE_SUCCESS_INFO_STYLE =
  "background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;";
const CONSOLE_FAILURE_LABEL_STYLE =
  "background: #606060; color: #fff; border-radius: 3px 0 0 3px;";
const CONSOLE_FAILURE_INFO_STYLE =
  "background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;";

const Encrypt = (plainData, key) => {
  const cipherparams = AES.encrypt(plainData, key, {
    iv: IV,
  });
  return cipherparams.toString();
};

const Decrypt = (encryptedData, key) => {
  const wordarray = AES.decrypt(encryptedData, key, {
    iv: IV,
  });
  return wordarray.toString(enc.Utf8);
};

const Log = (label, msg, isError = false) => {
  if (isError) {
    console.error(
      `%c ${label} %c ${msg} `,
      CONSOLE_FAILURE_LABEL_STYLE,
      CONSOLE_FAILURE_INFO_STYLE
    );
    return;
  }
  console.info(
    `%c ${label} %c ${msg} `,
    CONSOLE_SUCCESS_LABEL_STYLE,
    CONSOLE_SUCCESS_INFO_STYLE
  );
};
const ChecksumKey = () => {
  return window.btoa(window.location.host);
};

export const keyring = {
  initStorage(key) {
    const checksumKey = ChecksumKey();
    const checksumValue = window.localStorage.getItem(checksumKey);
    if (checksumValue == null) {
      const expectedCheckSum = HmacSHA512(checksumKey, key).toString();
      window.localStorage.clear();
      window.localStorage.setItem(checksumKey, expectedCheckSum);
      Log("Init Storage", "Setup");
    } else {
      Log("Init Storage", "Ignore");
    }
  },
  checkKey(key) {
    const checksumKey = ChecksumKey();
    const expectedCheckSum = HmacSHA512(checksumKey, key).toString();
    const checksumValue = window.localStorage.getItem(checksumKey);
    if (checksumValue === expectedCheckSum) {
      Log("Check Key", "Pass");
      return true;
    }
    Log("Check Key", "Fail", true);
    return false;
  },
  saveKeysData(newKey, keysData = []) {
    const checksumKey = ChecksumKey();
    const expectedCheckSum = HmacSHA512(checksumKey, newKey).toString();
    window.localStorage.setItem(checksumKey, expectedCheckSum);
    keysData.forEach((keyData) => {
      const timestamp = window.btoa(keyData.timestamp);
      window.localStorage.setItem(
        timestamp,
        Encrypt(
          JSON.stringify({
            alias: keyData.alias,
            account: keyData.account,
            password: keyData.password,
            more: keyData.more,
          }),
          newKey
        )
      );
    });
    Log("Save Keys Data", "Pass");
  },
  importKeysData(load = (keysData) => {}) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = () => {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
          if (load(this.result)) {
            Log("Import Keys Data", "Pass");
          } else {
            Log("Import Keys Data", "Fail", true);
          }
        };
        reader.readAsBinaryString(input.files[0]);
      }
      input.remove();
    };
    input.click();
  },
  exportKeysData(keysData = []) {
    const urlObject = window.URL || window.webkitURL || window;
    const blob = new Blob([JSON.stringify(keysData, null, 2)]);
    const a = document.createElement("a");
    a.download = "keyring.json";
    a.href = urlObject.createObjectURL(blob);
    a.click();
    a.remove();
    Log("Export Keys Data", "Download");
  },
  loadKeysData(key) {
    const result = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const dataKey = window.localStorage.key(i);
      const timestamp = "";
      try {
        timestamp = window.atob(dataKey);
      } catch (error) {
        continue;
      }
      if (
        timestamp === window.location.host ||
        timestamp.length === 0 ||
        /[^0-9]/.test(timestamp)
      ) {
        continue;
      }
      try {
        result.unshift({
          timestamp,
          ...JSON.parse(Decrypt(window.localStorage.getItem(dataKey), key)),
        });
      } catch (error) {
        Log("Load Keys Data", "Fail", true);
        return [];
      }
    }
    Log("Load Keys Data", "Pass");
    return result;
  },
  addKeyData(
    key,
    keyData = {
      timestamp: "", // not null
      alias: "", // not null
      account: "", // not null
      password: "", // not null
      more: "", // not null
    }
  ) {
    window.localStorage.setItem(
      window.btoa(keyData.timestamp),
      Encrypt(
        JSON.stringify({
          alias: keyData.alias,
          account: keyData.account,
          password: keyData.password,
          more: keyData.more,
        }),
        key
      )
    );
    Log("Add Key Data", keyData.timestamp);
  },
  deleteKeyData(timestamp) {
    delete window.localStorage[window.btoa(timestamp)];
    Log("Delete Key Data", timestamp);
  },
  updateKeyData(
    key,
    newKeyData = {
      timestamp: "", // not null
      alias: "", // not null
      account: "", // not null
      password: "", // not null
      more: "", // not null
    }
  ) {
    window.localStorage.setItem(
      window.btoa(newKeyData.timestamp),
      Encrypt(
        JSON.stringify({
          alias: newKeyData.alias,
          account: newKeyData.account,
          password: newKeyData.password,
          more: newKeyData.more,
        }),
        key
      )
    );
    Log("Update Key Data", newKeyData.timestamp);
  },
};
