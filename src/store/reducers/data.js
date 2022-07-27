import { formatAuthStore, updateStore } from "./tools";
const initialState = {};

const data = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case "SET_DATA":
      return formatAuthStore(updateStore(state, payload));
    case "RESET_DATA":
      return initialState;
    default:
      return state;
  }
};

export default data;
