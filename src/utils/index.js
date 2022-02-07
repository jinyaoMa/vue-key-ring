export { keyring } from "./key-ring";

export { ZH, EN, messages } from "./i18n";

export const isChinese = () => {
  if (
    window &&
    window.navigator &&
    window.navigator.language &&
    /^zh/i.test(window.navigator.language)
  ) {
    return true;
  }
  return false;
};
