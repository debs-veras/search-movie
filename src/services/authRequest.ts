import { ResquestToken } from "../types/auth.d";
import { deleteRequest, getRequest, postRequest } from "../utils/axiosRequest";
const API_KEY = import.meta.env.VITE_API_KEY;

export const userAuthRequestToken = async () => {
  return await getRequest(`3/authentication/token/new?api_key=${API_KEY}`);
};

export const userValidateLoginSession = async (data: ResquestToken) => {
  return await postRequest("3/authentication/token/validate_with_login", data);
};

export const userCreateSession = async (request_token: string) => {
    return await postRequest(`3/authentication/session/new`, {
    request_token,
  });
};

export const userValideteSession = async (session_id: string | null) => {
  return await getRequest(`3/account?api_key=${API_KEY}&session_id=${session_id}`);
};

export const removeSession = async (sessionId: string) => {
  return await deleteRequest(`3/authentication/session`, {
    session_id: sessionId, 
  });
};

