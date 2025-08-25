export type MultiResult = {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  name?: string;
  title?: string;
  overview?: string;
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
  known_for_department?: string;
};

export type PersonResult = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  media_type: 'person';
};

export type SerieResult = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  popularity: number;
  media_type?: 'tv';
};

export type MovieResult = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  media_type?: 'movie';
};
