import crypto from "crypto";

const METHOD_CHECK = "sha256";
const METHOD_LOAD = "sm4";
const IV = Date.now().toString();

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
  constructor(key = "jinyaoMa", listeners = {
    onLoaded = (keysData = []) => {},
    onAdded = (newKeyData = {}) => {},
    onRemoved = (removedKeyData = {}, index) => {},
    onUpdated = (updatedKeyData = {}, index) => {},
  }) {
    this.__key__ = key;
    this.__listeners__ = listeners;
    this.storage = window.localStorage;
    this.map = {};
    this.list = [];

    if (this.__check__()) {
      this.__load__();
    }
  }

  __check__() {
    const checksumKey = window.btoa(window.location.host);
    const hmac = crypto.createHmac(METHOD_CHECK, this.__key__);
    hmac.update(checksumKey);

    const expectedCheckSum = hmac.digest("hex");
    const checksumValue = this.storage.getItem(checksumKey);
    if (checksumValue == null) {
      this.storage.clear();
      this.storage.setItem(checksumKey, expectedCheckSum);
      return true;
    } else if (checksumValue === expectedCheckSum) {
      return true;
    }
    return false;
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
        this.map[timestamp] = JSON.parse(Decrypt(this.storage.getItem(dataKey), this.__key__));
        this.list.unshift({
          timestamp,
          ...this.map[timestamp]
        })
      } catch (error) {
        continue;
      }
    }

    const newKeysData = this.list.sort((a, b) => {
      return parseInt(b.timestamp) - parseInt(a.timestamp);
    })
    this.__listeners__.onLoaded(newKeysData);
  }

  add(keyData = {
    alias = "", // not null
    account = "", // not null
    password = "", // not null
    more = "", // not null
  }) {
    const timestamp = Date.now().toString();
    this.map[timestamp] = keyData;
    this.storage.setItem(window.btoa(timestamp), Encrypt(JSON.stringify(keyData), this.__key__));

    const newKeyData = {
      timestamp,
      ...keyData
    }
    this.list.unshift(newKeyData)
    this.__listeners__.onAdded(newKeyData);
  }

  remove(timestamp) {
    delete this.map[timestamp];
    delete this.storage[window.btoa(timestamp)];

    const targetIndex = this.list.findIndex(v => {
      return v.timestamp === timestamp
    })

    this.__listeners__.onRemoved(this.list[targetIndex], targetIndex)
    this.list = a.slice(0, targetIndex).concat(a.slice(targetIndex+1))
  }

  update(timestamp, newKeyData = {
    alias = "", // not null
    account = "", // not null
    password = "", // not null
    more = "", // not null
  }) {
    this.map[timestamp] = newKeyData;
    this.storage.setItem(window.btoa(timestamp), Encrypt(JSON.stringify(newKeyData), this.__key__));

    const targetIndex = this.list.findIndex(v => {
      return v.timestamp === timestamp
    })

    this.list[targetIndex] = {
      ...this.list[targetIndex],
      ...newKeyData
    }
    this.__listeners__.onUpdated(this.list[targetIndex], targetIndex);
  }
}
