import axios, { AxiosInstance } from "axios";
import { API_KEY, API_URL } from "./constants/api";

const getAxios = async (timeout: number = 600000) => {
  const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: timeout,
    params: {
      apikey: API_KEY,
      plot: "full"
    },
  });

  return instance;
};

export default getAxios;
