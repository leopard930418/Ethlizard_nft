import axios from "axios";
import store from "store";

const token = localStorage.getItem("access_token");
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch("RESET_AUTH");
    }
    return Promise.reject(error);
  }
);

export default axios;
