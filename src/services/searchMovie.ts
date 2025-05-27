import { getRequest } from "../utils/axiosRequest";

export const getBuscaFilme = async (url: string) => {
  return await getRequest(`?${url}`);
};
