import axios, { AxiosInstance } from "axios";
import { API_URL_TMDB } from "./constants/api";

const getAxios = (timeout: number = 600000) => {
  const apiKey: string | null = localStorage.getItem("@api_key");

  const instance: AxiosInstance = axios.create({
    baseURL: API_URL_TMDB,
    timeout: timeout,
    params: {
      api_key: apiKey,
      language: "pt-BR",
      include_adult: false,
      region: "BR",
    }
  });

  return instance;
};

export default getAxios;
