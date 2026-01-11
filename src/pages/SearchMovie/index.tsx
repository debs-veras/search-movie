import { BiSearch } from 'react-icons/bi';
import { GiPopcorn } from 'react-icons/gi';
import { useSearch } from '../../context/FiltroContext';
import CardBase from '../../components/CardBase';
import { API_URL_IMG_TMDB } from '../../constants/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getImageUrl } from '../../utils/getImageFallback';

export default function SearchMovie() {
  const {
    listMovie,
    listPerson,
    listSerie,
    listMulti,
    fetchMore,
    hasMore,
    loading,
    isFetchingMore,
    filtros,
    setFiltros,
  } = useSearch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const lists = {
    movie: listMovie,
    person: listPerson,
    tv: listSerie,
    multi: listMulti,
  };

  const currentList = lists[filtros.type || 'multi'] || [];
  const hasResults = currentList?.length > 0;

  const handleOpenDetails = (item: any) => {
    navigate(`/details/${item?.media_type || 'person'}/${item.id}`);
  };

  const renderCard = (item: any) => {
    const type = item.media_type || filtros.type || 'multi';
    const isPerson = type === 'person';
    const isMovie = type === 'movie';
    const isTv = type === 'tv';

    const path = isPerson ? item.profile_path : item.poster_path;
    const imageBase = `${API_URL_IMG_TMDB}`;
    const image = {
      src: `${imageBase}w500${path}`,
      srcSet: `${imageBase}w300${path} 300w, ${imageBase}w500${path} 500w, ${imageBase}original${path} 2000w`,
      sizes: '(min-width:1024px) 20vw, (min-width:768px) 25vw, 50vw',
      fallback: getImageUrl(item.media_type),
    };

    const title = item.title || item.name || 'Título Indisponível';
    const subtitle =
      item.release_date ||
      item.first_air_date ||
      item.known_for_department ||
      'Data Indisponível';

    return (
      <CardBase
        key={item.id}
        title={title}
        subtitle={subtitle}
        image={image}
        type={isMovie ? 'movie' : isTv ? 'tv' : 'person'}
        heightClass="h-72 md:h-80"
        actionColor={isMovie ? 'red' : isTv ? 'purple' : 'green'}
        onAction={() => handleOpenDetails(item)}
      />
    );
  };

  const type = [
    { key: 'multi', label: 'Todos' },
    { key: 'movie', label: 'Filmes' },
    { key: 'tv', label: 'Séries' },
    { key: 'person', label: 'Artistas' },
  ];

  useEffect(() => {
    const q = searchParams.get('q') ?? searchParams.get('query') ?? '';
    const t = searchParams.get('type') ?? '';
    const page = searchParams.get('page') ?? undefined;

    if (q || t)
      if (q !== (filtros.query || '') || t !== (filtros.type || ''))
        setFiltros({ query: q, type: t || filtros.type || 'multi', page });
  }, []);

  useEffect(() => {
    if (!filtros.query?.trim()) {
      navigate('/', { replace: true });
      return;
    }

    const params = new URLSearchParams();
    if (filtros.query) params.set('q', filtros.query);
    if (filtros.type) params.set('type', filtros.type);
    if ((filtros as any).page) params.set('page', (filtros as any).page);

    const search = params.toString();
    const current =
      typeof window !== 'undefined'
        ? window.location.search.replace(/^\?/, '')
        : '';
    if (current !== search) navigate(`/search?${search}`, { replace: true });
  }, [filtros.query, filtros.type]);

  return (
    <section className="mx-auto p-6">
      {loading && !isFetchingMore ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-transparent border-t-red-600 border-r-red-600 rounded-full animate-spin" />
            <GiPopcorn
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600"
              size={24}
            />
          </div>
          <p className="text-gray-400">Buscando em nosso acervo...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1 bg-red-600 rounded-full" />
            <h3 className="text-2xl font-bold">Resultados</h3>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-400">Tipo</label>
              <div className="inline-flex bg-gray-900 rounded-full p-1 flex-wrap">
                {type.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setFiltros({ ...filtros, type: opt.key })}
                    className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${
                      filtros.type === opt.key
                        ? 'bg-red-600 text-white shadow'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasResults ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentList.map(renderCard)}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={fetchMore}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow"
                  >
                    Carregar mais
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
              <BiSearch size={48} className="text-gray-600" />
              <span className="text-2xl text-gray-400">
                Nenhum resultado encontrado
              </span>
              <p className="text-gray-600 max-w-md">
                Tente ajustar seus filtros ou buscar por termos diferentes
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
