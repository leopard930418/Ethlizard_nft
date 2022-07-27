import { ERR_PASSWORD_CONFIRM } from "constants/messages";
import { ERR_VALIDATION_EMAIL, ERR_VALIDATION_TEXT } from "constants/messages";

export const checkEmail = (email = "") => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkValid = (type = "", value = "") => {
  if (type === "email") {
    return checkEmail(value);
  }
  return Boolean(value);
};

export const getValidationMessage = (type = "", name = "") => {
  if (type === "email") {
    return ERR_VALIDATION_EMAIL.LONG;
  }
  if (name === "password_confirm") {
    return ERR_PASSWORD_CONFIRM.LONG;
  }
  return ERR_VALIDATION_TEXT.LONG;
};

export const readableToSnake = (str = "") =>
  String(str).toLowerCase().replace(/[^\w]/g, "_");
