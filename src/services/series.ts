const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getSeriesByCategory = async (category: string) => {
  const res = await fetch(
    `${BASE_URL}/tv/${category}?api_key=${API_KEY}&language=pt-BR`
  );
  return res.json();
};

export const getSeriesByGenre = async (genreId: number) => {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}`
  );
  return res.json();
};
