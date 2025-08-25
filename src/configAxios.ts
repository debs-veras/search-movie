import axios, { AxiosInstance } from 'axios';
import { API_URL_TMDB } from './constants/api';

const token = import.meta.env.VITE_AUTH_TOKEN;

const getAxios = (timeout: number = 600000) => {
  const instance: AxiosInstance = axios.create({
    baseURL: API_URL_TMDB,
    timeout: timeout,
    params: {
      language: 'pt-BR',
      region: 'BR',
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};

export default getAxios;
