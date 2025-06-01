// import { API_URL_TMDB } from "../constants/api";
import { getRequest } from "../utils/axiosRequest";

export const getBuscaFilme = async (url: string) => {
  return await getRequest(`/3/search/multi?${url}`);
};

// export const getBuscaFilmeTmdb = async (query: string, type = "movie") => {
//   const endpoint = type === "tv" ? "search/tv" : "search/movie";
//   const response = await axios.get(`${API_URL_TMDB}/${endpoint}`, {
//     params: {
//       api_key: API_kEY_TMDB,
//       language: "pt-BR",
//       query,
//       include_adult: false,
//     },
//   });

  // return response.data.results;
// };