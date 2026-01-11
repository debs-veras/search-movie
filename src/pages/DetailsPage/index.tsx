import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaPlay,
  FaCalendarAlt,
  FaImdb,
  FaPlus,
  FaTimes,
} from 'react-icons/fa';
import { BiTime, BiWorld } from 'react-icons/bi';
import { getDetails } from '../../services/searchRequest';
import { getAccountStates, markAsFavorite } from '../../services/movieRequest';
import { API_URL_IMG_TMDB, URL_TMDB } from '../../constants/api';
import ErrorSection from '../../components/ErrorSection';
import { getImageUrl } from '../../utils/getImageFallback';
import storage from '../../utils/storage';
import useToastLoading from '../../hooks/useToastLoading';
import { useAuth } from '../../context/AuthContext';
import Loading from '../../components/Loading';

interface DetailsData {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  biography?: string;
  poster_path?: string;
  profile_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  genres?: Array<{ id: number; name: string }>;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      type: string;
      site: string;
    }>;
  };
  birthday?: string;
  place_of_birth?: string;
  known_for_department?: string;
  status?: string;
  tagline?: string;
  original_language?: string;
  production_companies?: Array<{ name: string }>;
}

export default function DetailsPage() {
  const { id, media_type } = useParams<{ id: string; media_type: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<DetailsData | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'cast'>('overview');
  const [showWorks, setShowWorks] = useState(false);

  // Favoritos
  const [isFavorited, setIsFavorited] = useState(false);
  const [favProcessing, setFavProcessing] = useState(false);
  const toast = useToastLoading();
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);

      if (!id || !media_type)
        throw new Error('ID ou tipo de mídia não encontrado');

      const response = await getDetails(media_type, id);

      if (!response.success) throw new Error(response.message);

      const data = response.data;
      setDetails(data);

      // Trailer
      const trailerVideo = data.videos?.results?.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
      );

      if (trailerVideo) setTrailer(trailerVideo.key);

      // Favorito
      const session = storage.getSession();
      if (session && media_type !== 'person') {
        const accountStates = await getAccountStates(
          media_type,
          Number(id),
          session
        );

        if (!accountStates?.success)
          throw new Error(accountStates?.message || 'Erro ao buscar favoritos');

        setIsFavorited(!!accountStates.data?.favorite);
      }
    } catch (error: any) {
      toast({
        mensagem: error.message || 'Erro inesperado',
        tipo: 'error',
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const isPerson = media_type === 'person';
  const imagePath = isPerson ? details?.profile_path : details?.poster_path;
  const mainImage = imagePath
    ? `${API_URL_IMG_TMDB}/w500${imagePath}`
    : getImageUrl(media_type);

  const backdropImageSrc = details?.backdrop_path
    ? `${API_URL_IMG_TMDB}/original${details.backdrop_path}`
    : null;
  const backdropImageSrcSet = details?.backdrop_path
    ? `${API_URL_IMG_TMDB}/w780${details.backdrop_path} 780w, ${API_URL_IMG_TMDB}/w1280${details.backdrop_path} 1280w, ${API_URL_IMG_TMDB}/w1920${details.backdrop_path} 1920w, ${API_URL_IMG_TMDB}/original${details.backdrop_path} 3840w`
    : null;

  const title = details?.title || details?.name || 'Título não disponível';
  const releaseDate = details?.release_date || details?.first_air_date;
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('pt-BR')
    : null;

  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

  const getRuntime = () => {
    if (media_type === 'movie' && details?.runtime) {
      const hours = Math.floor(details.runtime / 60);
      const minutes = details.runtime % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    if (media_type === 'tv' && details?.episode_run_time?.[0])
      return `${details.episode_run_time[0]}min`;

    return null;
  };

  const getDirector = () => {
    return details?.credits?.crew?.find((person) => person.job === 'Director')
      ?.name;
  };

  const handleAddToList = async () => {
    const session = storage.getSession();
    if (!session || !user) return;
    setFavProcessing(true);
    const accountId = user.id;
    const data = {
      accountId,
      session_id: session,
      media_type: media_type as 'movie' | 'tv',
      media_id: Number(id),
      favorite: !isFavorited,
    };

    const response = await markAsFavorite(data);

    if (response?.success) setIsFavorited(!isFavorited);

    toast({
      mensagem: response.message,
      tipo: response.success ? 'success' : 'error',
    });

    setFavProcessing(false);
  };

  const personCreditsCast =
    (details as any)?.combined_credits?.cast ??
    (details as any)?.credits?.cast ??
    [];

  const personCreditsCrew =
    (details as any)?.combined_credits?.crew ??
    (details as any)?.credits?.crew ??
    [];

  const combinedWorks = [...personCreditsCast, ...personCreditsCrew]
    .filter(Boolean)
    .sort((a: any, b: any) => {
      const dateA = a.release_date || a.first_air_date || '';
      const dateB = b.release_date || b.first_air_date || '';
      if (dateA && dateB) return dateB.localeCompare(dateA);
      if (b.popularity || 0) return (b.popularity || 0) - (a.popularity || 0);
      return 0;
    });

  const seenWorks = new Set<string>();
  const uniqueWorks = [] as any[];
  for (const w of combinedWorks) {
    const media = w.media_type || (w.title ? 'movie' : 'tv');
    const key = `${w.id}-${media}`;
    if (!seenWorks.has(key)) {
      seenWorks.add(key);
      uniqueWorks.push({ ...w, media_type: media });
    }
  }

  const displayedWorks = uniqueWorks.slice(0, 24);

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  if (!details)
    return <ErrorSection error={'Nada encontrado'} onRetry={fetchData} />;

  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-20">
        {/* Background */}

        {backdropImageSrc && (
          <div className="absolute inset-0 z-0">
            <img
              src={backdropImageSrc ?? getImageUrl(media_type)}
              srcSet={backdropImageSrcSet ?? undefined}
              sizes="100vw"
              alt={title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Poster */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="relative group">
                <img
                  src={mainImage}
                  alt={title}
                  className="w-80 h-[480px] object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                />
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl backdrop-blur-sm cursor-pointer"
                  >
                    <div className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-all duration-300 transform group-hover:scale-110">
                      <FaPlay size={24} />
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Informações principais */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {title}
                </h1>

                {details.tagline && (
                  <p className="text-xl text-gray-400 italic mb-4">
                    "{details.tagline}"
                  </p>
                )}

                {/* Metadados */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {!isPerson && details.vote_average && (
                    <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-700">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">
                        {details.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}

                  {year && (
                    <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-700">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>{year}</span>
                    </div>
                  )}

                  {getRuntime() && (
                    <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-700">
                      <BiTime className="text-green-400" />
                      <span>{getRuntime()}</span>
                    </div>
                  )}

                  {details.original_language && (
                    <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-700">
                      <BiWorld className="text-purple-400" />
                      <span className="uppercase">
                        {details.original_language}
                      </span>
                    </div>
                  )}
                </div>

                {/* Gêneros */}
                {!isPerson && details.genres && details.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {details.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões de ação */}
              <div className="flex flex-wrap gap-4">
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                  >
                    <FaPlay />
                    Assistir Trailer
                  </button>
                )}

                {!isPerson && (
                  <button
                    onClick={handleAddToList}
                    disabled={favProcessing}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-gray-600 ${favProcessing ? 'bg-gray-700/50 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 cursor-pointer'}`}
                  >
                    {isFavorited ? <FaStar /> : <FaPlus />}
                    {isFavorited ? 'Favorito' : 'Adicionar a Minha Lista'}
                  </button>
                )}
                <a
                  href={`${URL_TMDB}/${media_type}/${details.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
                >
                  <FaImdb />
                  TMDB
                </a>
              </div>

              {/* Overview/Biography */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  {isPerson ? 'Biografia' : 'Sinopse'}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {details.overview ||
                    details.biography ||
                    'Descrição não disponível.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de Navegação - Apenas para filmes/séries */}
      {!isPerson && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="border-b border-gray-700 mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Detalhes
              </button>
              <button
                onClick={() => setActiveTab('cast')}
                className={`pb-4 font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'cast'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Elenco
              </button>
            </div>
          </div>

          {/* Conteúdo das Tabs */}
          <div className="min-h-96">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Informações principais */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Informações
                  </h3>

                  <div className="space-y-4">
                    {getDirector() && (
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">Direção</h4>
                        <p className="text-white font-semibold">
                          {getDirector()}
                        </p>
                      </div>
                    )}

                    {details.status && (
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">Status</h4>
                        <p className="text-white font-semibold">
                          {details.status}
                        </p>
                      </div>
                    )}

                    {details.original_language && (
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">
                          Idioma Original
                        </h4>
                        <p className="text-white font-semibold uppercase">
                          {details.original_language}
                        </p>
                      </div>
                    )}

                    {formattedDate && (
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">
                          {media_type === 'tv' ? 'Estreia' : 'Lançamento'}
                        </h4>
                        <p className="text-white font-semibold">
                          {formattedDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empresas de produção */}
                {details.production_companies &&
                  details.production_companies.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Produção
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {details.production_companies.map((company, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-sm border border-gray-700"
                          >
                            {company.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {activeTab === 'cast' && details.credits?.cast && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Elenco Principal
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {details.credits.cast.slice(0, 12).map((person) => (
                    <div
                      key={person.id}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300 group border border-gray-700 cursor-pointer"
                      onClick={() => navigate(`/details/person/${person.id}`)}
                    >
                      <div className="relative mb-3 overflow-hidden rounded-lg">
                        <img
                          src={
                            person.profile_path
                              ? `${API_URL_IMG_TMDB}/w300${person.profile_path}`
                              : getImageUrl('person')
                          }
                          alt={person.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                          {person.name}
                        </p>
                        <p className="text-gray-400 text-xs line-clamp-2">
                          {person.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Informações para pessoas */}
      {isPerson && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              Informações Pessoais
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {details.birthday && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Nascimento</h3>
                  <p className="text-white font-semibold text-lg">
                    {new Date(details.birthday).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}
              {details.place_of_birth && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">
                    Local de Nascimento
                  </h3>
                  <p className="text-white font-semibold text-lg">
                    {details.place_of_birth}
                  </p>
                </div>
              )}
              {details.known_for_department && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Departamento</h3>
                  <p className="text-white font-semibold text-lg">
                    {details.known_for_department}
                  </p>
                </div>
              )}
              {details.popularity && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Popularidade</h3>
                  <p className="text-white font-semibold text-lg">
                    {Math.round(details.popularity)} pontos
                  </p>
                </div>
              )}
            </div>

            {/* Trabalhos / Filmografia (apenas pessoa) */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => setShowWorks((s) => !s)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors duration-200"
              >
                {showWorks ? 'Esconder Trabalhos' : 'Ver Trabalhos'}
              </button>
              <span className="text-sm text-gray-400">
                {uniqueWorks.length} encontrados
              </span>
            </div>

            {showWorks && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Trabalhos
                </h3>
                {displayedWorks.length === 0 ? (
                  <p className="text-gray-400">Nenhum trabalho encontrado.</p>
                ) : (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {displayedWorks.map((work) => (
                      <div
                        key={`${work.id}-${work.media_type}`}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 hover:bg-gray-700/50 transition-all duration-300 group border border-gray-700 cursor-pointer"
                        onClick={() =>
                          navigate(`/details/${work.media_type}/${work.id}`)
                        }
                      >
                        <div className="relative mb-3 overflow-hidden rounded-lg">
                          <img
                            src={
                              work.poster_path
                                ? `${API_URL_IMG_TMDB}/w300${work.poster_path}`
                                : work.backdrop_path
                                  ? `${API_URL_IMG_TMDB}/w300${work.backdrop_path}`
                                  : getImageUrl(work.media_type)
                            }
                            alt={work.title || work.name}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                            {work.title || work.name}
                          </p>
                          <p className="text-gray-400 text-xs line-clamp-2">
                            {work.character || work.job || work.media_type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal do Trailer */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-gray-900/80 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 cursor-pointer"
            >
              <FaTimes size={20} />
            </button>

            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
