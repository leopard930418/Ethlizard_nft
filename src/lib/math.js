export const zeroLeading = (num = 0, size = 0, p, isCut = false) => {
  num = num.toString(p);
  while (num.length < size) num = "0" + num;
  return isCut && num.length > size ? num.substr(num.length - size, size) : num;
};

export const filterNumber = (str, isDot = false, isMinus = false) => {
  if (isDot) {
    if (isMinus) {
      return String(str).replace(/[^0-9.-]/g, "");
    }
    return String(str).replace(/[^0-9.]/g, "");
  } else {
    if (isMinus) {
      return String(str).replace(/[^0-9]/g, "");
    }
    return String(str).replace(/[^0-9-]/g, "");
  }
};

export const toNumber = (str = "") => {
  const n = Number(filterNumber(str, true, true) || "");
  return Boolean(n) ? n : 0;
};

export function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}
