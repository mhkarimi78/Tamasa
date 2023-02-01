import axios from "axios";
import url from "./url";
import promise from "promise";

// let cors = require("cors");
// app.use(cors());

const AxiosBase = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
    // "x-apikey": "141",
  },
});

AxiosBase.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem("token");
      if (token) request.headers.Authorization = `Bearer ${token}`;
      // request.headers.Authorization = `zobYvKfNfOyAUvoDUs3JMy`;
      return request;
    } catch (err) {
      return err;
    }
  },
  function (error) {
    return promise.reject(error);
  }
);

AxiosBase.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("401 error");
      }
      return error.response;
    }
    if (error.message === "NO_NETWORK_FOUND") {
      console.log("neterror");
      return Promise.reject("NO_NETWORK_FOUND");
    } else {
      console.log(`no data`, error);
      return Promise.reject("NO_DATA_RECEIVED" + error);
    }
  }
);

export default AxiosBase;
