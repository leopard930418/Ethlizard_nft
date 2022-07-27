import { APP_NAME } from "config";
import jwt_decode from "jwt-decode";
import { jsonParse } from "lib/json";
import { formatAuthStore, updateStore } from "./tools";

const initialState = {
  user: {},
  isAuth: false,
  token: "",
};

const restoreState = {
  ...initialState,
  ...(jsonParse(localStorage.getItem(APP_NAME))?.auth ?? {}),
};

const checkAuth = (state = initialState, payload) => {
  const token = state?.token ?? "";
  if (token) {
    var decodedToken = jwt_decode(token, { complete: true });
    var dateNow = new Date();

    const isValid = decodedToken.exp > dateNow.getTime() / 1000;

    const isUser = state?.user?.user_type_id === 4;

    if (isValid && token && isUser) {
      return { ...(state ?? initialState), isAuth: true };
    }
  }

  return state;
};

const auth = (state = restoreState, { type, payload = null }) => {
  switch (type) {
    case "SET_AUTH":
      return formatAuthStore(updateStore(state, payload));
    case "UPDATE_AUTH":
      return formatAuthStore(updateStore(state, payload));
    case "CHECK_AUTH":
      return checkAuth(state, payload);
    case "RESET_AUTH":
      return initialState;
    default:
      return state;
  }
};

export default auth;
