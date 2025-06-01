import { ResquestToken } from "../types/auth.d";
import { getRequest, postRequest } from "../utils/axiosRequest";

export const userAuthRequestToken = async (api_key: string) => {
  return await getRequest(`3/authentication/token/new?api_key=${api_key}`);
};


export const userCreateSession = async (data: ResquestToken) => {
  return await postRequest(`3/authentication/token/validate_with_login`, data);
};

export const userValideteSession = async () => {
  return await getRequest(`/3/authentication`);
};

