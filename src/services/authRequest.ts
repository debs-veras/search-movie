import { ResquestToken } from '../types/auth.d';
import { deleteRequest, getRequest, postRequest } from '../utils/axiosRequest';

export const userAuthRequestToken = async () => {
  return await getRequest(`3/authentication/token/new`);
};

export const userValidateLoginSession = async (data: ResquestToken) => {
  return await postRequest('3/authentication/token/validate_with_login', data);
};

export const userCreateSession = async (request_token: string) => {
  return await postRequest(`3/authentication/session/new`, {
    request_token,
  });
};

export const removeSession = async (sessionId: string) => {
  return await deleteRequest(`3/authentication/session`, {
    session_id: sessionId,
  });
};

export const getAccountDetails = async (session_id: string) => {
  return await getRequest(`3/account?session_id=${session_id}`);
};
