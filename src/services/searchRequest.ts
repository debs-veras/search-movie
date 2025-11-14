import { getRequest } from '../utils/axiosRequest';

export const getSearchMovie = async (
  url: string,
  type: string,
  signal?: AbortSignal
) => {
  return await getRequest(`/3/search/${type}?${url}`, signal);
};

export async function getDetails(type: string, id: string) {
  return await getRequest(`/3/${type}/${id}?append_to_response=videos,credits`);
}
