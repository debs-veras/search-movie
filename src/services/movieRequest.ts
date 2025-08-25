import { getRequest } from '../utils/axiosRequest';

export const getReleasedSoon = async () => {
  return await getRequest(`/3/movie/upcoming`);
};

export const getTrendingHero = async () => {
  return await getRequest(`/3/trending/movie/week`);
};
