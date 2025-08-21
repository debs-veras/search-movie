import { getRequest } from "../utils/axiosRequest";

export const getSearchMovie = async (url: string, type: string) => {
  return await getRequest(`/3/search/${type}?${url}`);
};