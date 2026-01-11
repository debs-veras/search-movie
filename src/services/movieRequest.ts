import { getRequest, postRequest } from '../utils/axiosRequest';

export const getReleasedSoon = async () => {
  return await getRequest(`/3/movie/upcoming`);
};

export const getTrendingHero = async () => {
  return await getRequest(`/3/trending/movie/week`);
};

export const getAccountStates = async (
  media_type: string,
  media_id: number,
  session_id: string
) => {
  return await getRequest(
    `/3/${media_type}/${media_id}/account_states?session_id=${session_id}`
  );
};

export const markAsFavorite = async (data: any) => {
  return await postRequest(
    `/3/account/${data.accountId}/favorite?session_id=${data.session_id}`,
    {
      media_type: data.media_type,
      media_id: data.media_id,
      favorite: data.favorite,
    }
  );
};

export const getFavoriteMovies = async (
  accountId: number,
  session_id: string,
  page = 1
) => {
  return await getRequest(
    `/3/account/${accountId}/favorite/movies?session_id=${session_id}&page=${page}`
  );
};

export const getFavoriteTV = async (
  accountId: number,
  session_id: string,
  page = 1
) => {
  return await getRequest(
    `/3/account/${accountId}/favorite/tv?session_id=${session_id}&page=${page}`
  );
};
