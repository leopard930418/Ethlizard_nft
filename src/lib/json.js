export function isJSONValid(text) {
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  }
  return true;
}
export function isJSONArray(text) {
  if (!isJSONValid(text)) return false;
  let t = JSON.parse(text);
  if (t?.length >= 0) return true;
  else return false;
}

export const formatJSONString = (str, isArray = false) => {
  if (Boolean(isArray)) {
    return isJSONArray(String(str)) ? String(str) : "[]";
  } else {
    return isJSONValid(String(str)) ? String(str) : "{}";
  }
};

export const jsonParse = (str, isArray = false) => {
  return JSON.parse(formatJSONString(str, isArray));
};
