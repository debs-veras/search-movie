import { useEffect, useState } from 'react';
import { API_URL_IMG_TMDB } from '../../constants/api';
import {
  getFavoriteMovies,
  getFavoriteTV,
  markAsFavorite,
} from '../../services/movieRequest';
import { useAuth } from '../../context/AuthContext';
import storage from '../../utils/storage';
import useToastLoading from '../../hooks/useToastLoading';
import { FaTimes, FaSpinner, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageFallback';

type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

export default function MyCollection() {
  const { user } = useAuth();
  const session = storage.getSession();
  const toast = useToastLoading();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Busca favoritos: acionada quando a aba, usuário ou sessão mudam
  const fetchPage = async (p = 1) => {
    if (!user || !session) {
      setItems([]);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    if (p === 1) setLoading(true);
    else setLoadingMore(true);

    const accountId = user.id;
    const response =
      activeTab === 'movies'
        ? await getFavoriteMovies(accountId, session, p)
        : await getFavoriteTV(accountId, session, p);

    if (response?.success && response.data) {
      const results = response.data.results || [];
      setItems((prev) => (p === 1 ? results : [...prev, ...results]));
      setTotalPages(response.data.total_pages || 1);
      setTotalResults(response.data.total_results || results.length || 0);
      setPage(p);
    } else {
      toast({
        mensagem: response.data,
        tipo: 'error',
      });
    }

    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    // Recarrega quando trocar de aba ou quando o usuário/sessão mudarem
    fetchPage(1);
  }, [activeTab, user?.id, session]);

  const loadMore = () => {
    if (page < totalPages) fetchPage(page + 1);
  };

  const handleRemoveFavorite = async (media_id: number) => {
    if (!user || !session) return;
    toast({ mensagem: 'Removendo...' });
    setProcessing(true);
    const data = {
      accountI: user.id,
      session_id: session,
      media_type: activeTab === 'movies' ? 'movie' : 'tv',
      media_id: media_id,
      favorite: false,
    };
    const response = await markAsFavorite(data);
    toast({ tipo: 'dismiss' });

    if (response?.success)
      setItems((prev) => prev.filter((i) => i.id !== media_id));

    toast({
      mensagem: response.message,
      tipo: response.success ? 'success' : 'error',
    });

    setProcessing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Minha Coleção</h1>
          <p className="text-sm text-gray-400 mt-1">
            {totalResults} itens{' '}
            {activeTab === 'movies' ? 'em filmes' : 'em séries'}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center bg-gray-800/40 rounded-full p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'movies' ? 'bg-red-600 text-white' : 'text-gray-300'}`}
            >
              Filmes
            </button>
            <button
              onClick={() => setActiveTab('tv')}
              className={`px-4 py-2 rounded-full font-semibold ${activeTab === 'tv' ? 'bg-red-600 text-white' : 'text-gray-300'}`}
            >
              Séries
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 animate-pulse h-56"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
          <FaStar className="mx-auto text-yellow-400 text-3xl mb-4" />
          <h3 className="text-white font-semibold text-lg">
            Nenhum favorito encontrado
          </h3>
          <p className="text-gray-400 mt-2">
            Adicione filmes ou séries aos seus favoritos para vê-los aqui.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item) => {
              const year = item.release_date
                ? new Date(item.release_date).getFullYear()
                : item.first_air_date
                  ? new Date(item.first_air_date).getFullYear()
                  : '';
              return (
                <div
                  key={item.id}
                  className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 shadow-sm"
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/details/${activeTab === 'movies' ? 'movie' : 'tv'}/${item.id}`
                      )
                    }
                  >
                    <img
                      src={
                        item.poster_path
                          ? `${API_URL_IMG_TMDB}/w300${item.poster_path}`
                          : getImageUrl(activeTab === 'movies' ? 'movie' : 'tv')
                      }
                      alt={item.title || item.name}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(item.id);
                      }}
                      disabled={processing}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-colors"
                      title="Remover dos favoritos"
                    >
                      <FaTimes />
                    </button>

                    <div className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="font-semibold text-white text-sm line-clamp-2">
                        {item.title || item.name}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">{year}</span>
                        {item.vote_average ? (
                          <span className="text-xs text-yellow-400 font-semibold">
                            {item.vote_average.toFixed(1)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {page < totalPages && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className={`px-6 py-3 rounded-lg ${loadingMore ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                {loadingMore ? (
                  <div className="flex items-center gap-2 text-gray-200">
                    <FaSpinner className="animate-spin" />
                    Carregando
                  </div>
                ) : (
                  'Carregar mais'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
