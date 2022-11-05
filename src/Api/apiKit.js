// import { SERVER_URL } from '../../constant';
import axios from "axios";
import { serverUrl } from "../themes/appConstant";

const { url } = serverUrl

// 192.168.3.152
let APIKit = axios.create({
  baseURL: `${url}api/v1`,
  // baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000000,
});

APIKit.interceptors.request.use(async (config) => {
  const tokenData = localStorage.getItem("token");
  if (tokenData) {
    config.headers["access-token"] = `Bearer ${tokenData}`;
  }

  return config;
});
export default APIKit;
