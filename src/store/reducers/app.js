import { APP_NAME } from "config";
import { jsonParse } from "lib/json";
import { formatAuthStore, updateStore } from "./tools";
const initialState = {};

const restoreState = {
  ...initialState,
  ...(jsonParse(localStorage.getItem(APP_NAME))?.app ?? {}),
};

const app = (state = restoreState, { type, payload = null }) => {
  switch (type) {
    case "SET_APP":
      return formatAuthStore(updateStore(state, payload));
    case "UPDATE_APP":
      return formatAuthStore(updateStore(state, payload));
    case "RESET_APP":
      return initialState;
    default:
      return state;
  }
};

export default app;
