import { YMDHMS } from "constant/dateWords";
import http from "lib/http";
import { isObject } from "lodash";
import moment from "moment";

export const updateStore = (state = {}, payload) => {
  return !payload
    ? state
    : typeof payload === "function"
    ? payload(state)
    : isObject(payload)
    ? {
        ...state,
        ...payload,
      }
    : state;
};

export const formatAuthStore = (data = {}) => {
  const isAuth = moment(data?.expire_at, YMDHMS, true).isAfter(moment());
  const token = data?.token ?? "";

  if (isAuth) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return {
    ...data,
    // isAuth: isAuth,
  };
};
