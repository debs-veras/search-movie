import axios, { AxiosInstance } from "axios";
import { API_URL_TMDB } from "./constants/api";

const getAxios = async (timeout: number = 600000) => {
  // const api_key: string | null = localStorage.getItem("@api_key");
  const token: string | null = localStorage.getItem("@admin_token");

  const instance: AxiosInstance = axios.create({
    baseURL: API_URL_TMDB,
    timeout: timeout,
    params: {
      language: "pt-BR",
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};

export default getAxios;
