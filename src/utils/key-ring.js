import crypto from "crypto";

const METHOD_CHECK = "sha256";
const METHOD_LOAD = "sm4";
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
  const cipher = crypto.createCipheriv(METHOD_LOAD, key, IV);
  let crypted = cipher.update(plainData, "utf-8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

const Decrypt = (encryptedData, key) => {
  const decipher = crypto.createDecipheriv(METHOD_LOAD, key, IV);
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

export class KeyRing {
  constructor(
    key = "jinyaoMa",
    listeners = {
      onChecked(ok) {
        ok;
      },
      onLoaded(keysData = []) {},
      onAdded(newKeyData = {}) {},
      onRemoved(removedKeyData = {}, index) {},
      onUpdated(updatedKeyData = {}, index) {},
    }
  ) {
    this.__key__ = key;
    this.__listeners__ = listeners;
    this.storage = window.localStorage;
    this.map = {};
    this.list = [];

    if (this.__listeners__.onChecked(this.__check__())) {
      this.__load__();
    }
  }

  __check__() {
    const checksumKey = window.btoa(window.location.host);
    const hmac = crypto.createHmac(METHOD_CHECK, this.__key__);
    hmac.update(checksumKey);

    const expectedCheckSum = hmac.digest("hex");
    const checksumValue = this.storage.getItem(checksumKey);
    let isKeyOk = false;
    if (checksumValue == null) {
      this.storage.clear();
      this.storage.setItem(checksumKey, expectedCheckSum);
      isKeyOk = true;
    } else if (checksumValue === expectedCheckSum) {
      isKeyOk = true;
    }
    if (isKeyOk) {
      console.info(
        `%c Key Check %c Pass`,
        CONSOLE_SUCCESS_LABEL_STYLE,
        CONSOLE_SUCCESS_INFO_STYLE
      );
    } else {
      console.error(
        `%c Key Check %c Fail`,
        CONSOLE_FAILURE_LABEL_STYLE,
        CONSOLE_FAILURE_INFO_STYLE
      );
    }
    return isKeyOk;
  }

  __load__() {
    for (let i = 0; i < this.storage.length; i++) {
      const dataKey = this.storage.key(i);
      const timestamp = window.atob(dataKey);
      if (
        timestamp === window.location.host ||
        timestamp.length === 0 ||
        /[^0-9]/.test(timestamp)
      ) {
        continue;
      }
      try {
        this.map[timestamp] = JSON.parse(
          Decrypt(this.storage.getItem(dataKey), this.__key__)
        );
        this.list.unshift({
          timestamp,
          ...this.map[timestamp],
        });
      } catch (error) {
        this.map = {};
        this.list = [];
        console.error(
          `%c Loaded %c Fail`,
          CONSOLE_FAILURE_LABEL_STYLE,
          CONSOLE_FAILURE_INFO_STYLE
        );
        return;
      }
    }

    const newKeysData = this.list.sort((a, b) => {
      return parseInt(b.timestamp) - parseInt(a.timestamp);
    });
    console.info(
      `%c Loaded %c Pass`,
      CONSOLE_SUCCESS_LABEL_STYLE,
      CONSOLE_SUCCESS_INFO_STYLE
    );
    this.__listeners__.onLoaded(newKeysData);
  }

  add(
    keyData = {
      alias: "", // not null
      account: "", // not null
      password: "", // not null
      more: "", // not null
    }
  ) {
    const timestamp = Date.now().toString();
    this.map[timestamp] = keyData;
    this.storage.setItem(
      window.btoa(timestamp),
      Encrypt(JSON.stringify(keyData), this.__key__)
    );

    const newKeyData = {
      timestamp,
      ...keyData,
    };
    this.list.unshift(newKeyData);
    console.info(
      `%c Added %c ${timestamp}`,
      CONSOLE_SUCCESS_LABEL_STYLE,
      CONSOLE_SUCCESS_INFO_STYLE
    );
    this.__listeners__.onAdded(newKeyData);
  }

  remove(timestamp) {
    delete this.map[timestamp];
    delete this.storage[window.btoa(timestamp)];

    const targetIndex = this.list.findIndex((v) => {
      return v.timestamp === timestamp;
    });

    this.__listeners__.onRemoved(this.list[targetIndex], targetIndex);
    this.list = a.slice(0, targetIndex).concat(a.slice(targetIndex + 1));
    console.info(
      `%c Removed %c ${timestamp}`,
      CONSOLE_SUCCESS_LABEL_STYLE,
      CONSOLE_SUCCESS_INFO_STYLE
    );
  }

  update(
    timestamp,
    newKeyData = {
      alias: "", // not null
      account: "", // not null
      password: "", // not null
      more: "", // not null
    }
  ) {
    this.map[timestamp] = newKeyData;
    this.storage.setItem(
      window.btoa(timestamp),
      Encrypt(JSON.stringify(newKeyData), this.__key__)
    );

    const targetIndex = this.list.findIndex((v) => {
      return v.timestamp === timestamp;
    });

    this.list[targetIndex] = {
      ...this.list[targetIndex],
      ...newKeyData,
    };
    console.info(
      `%c Updated %c ${timestamp}`,
      CONSOLE_SUCCESS_LABEL_STYLE,
      CONSOLE_SUCCESS_INFO_STYLE
    );
    this.__listeners__.onUpdated(this.list[targetIndex], targetIndex);
  }
}
