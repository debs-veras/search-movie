// Tipos para Séries (TV Shows)
export interface Series {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Cast[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  type: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string | null;
}

// Tipos para a resposta da API
export interface ApiResponse<T> {
  results: T[];
}
