import { getRequest } from "../utils/axiosRequest";

export const postUploadArquivo = async (url: string) => {
  return await getRequest(`?${url}`);
};
