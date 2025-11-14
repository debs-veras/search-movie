import { useEffect, useState, useRef } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFire,
  FaTimes,
  FaStar,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';

interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Movie[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

const API_KEY = 'c82e5a4a26d33a1e3ca752a5daa59d54';
const BASE_URL = 'https://api.themoviedb.org/3';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function CollectionsSection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionIds = [10, 1241, 86311, 9485, 295, 119];

        const collectionPromises = collectionIds.map((id) =>
          axios.get(`${BASE_URL}/collection/${id}`, {
            params: { api_key: API_KEY, language: 'pt-BR' },
          })
        );

        const responses = await Promise.all(collectionPromises);
        const collectionsData = responses.map((res) => res.data);

        const collectionsWithMovieDetails = await Promise.all(
          collectionsData.map(async (collection) => {
            const movieDetailsPromises = collection.parts.map((movie) =>
              axios.get(`${BASE_URL}/movie/${movie.id}`, {
                params: { api_key: API_KEY, language: 'pt-BR' },
              })
            );

            const movieDetailsResponses =
              await Promise.all(movieDetailsPromises);
            const moviesWithDetails = movieDetailsResponses.map(
              (res) => res.data
            );

            return { ...collection, parts: moviesWithDetails };
          })
        );

        setCollections(collectionsWithMovieDetails);
      } catch (err) {
        console.error('Erro ao buscar coleções:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const openModal = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsModalOpen(true);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedCollection(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  const handleMovieClick = (movieId: number) => {
    window.open(`https://www.themoviedb.org/movie/${movieId}`, '_blank');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FaFire className="text-red-500" />
              Coleções em Destaque
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-800 rounded-xl animate-pulse border border-gray-700"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-4 sm:px-8">
        <div className="mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FaFire className="text-red-500" />
              Coleções em Destaque
            </h3>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.collection-swiper-button-next',
              prevEl: '.collection-swiper-button-prev',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {collections.map((collection) => (
              <SwiperSlide
                key={collection.id}
                className="rounded-xl overflow-hidden"
              >
                <div className="relative group rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300 h-80">
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${collection.backdrop_path}`}
                    alt={collection.name}
                    className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h4 className="text-xl font-bold mb-2">
                      {collection.name}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {collection.overview}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-red-400">
                        <span>{collection.parts.length} filmes</span>
                      </div>
                      <button
                        onClick={() => openModal(collection)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-all duration-300 transform cursor-pointer hover:scale-105"
                      >
                        Ver Coleção
                      </button>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
              </SwiperSlide>
            ))}

            <button className="collection-swiper-button-next absolute top-1/2 right-2 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-900/80 hover:bg-red-600 rounded-full transition-all duration-300 cursor-pointer">
              <FaChevronRight />
            </button>
            <button className="collection-swiper-button-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-900/80 hover:bg-red-600 rounded-full transition-all duration-300 cursor-pointer">
              <FaChevronLeft />
            </button>
          </Swiper>
        </div>
      </section>

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {isModalOpen && selectedCollection && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full h-[90vh] flex flex-col"
              // variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              ref={modalContentRef}
            >
              {/* Header do Modal com Imagem de Alta Qualidade */}
              <div className="relative h-64 flex-shrink-0">
                <div className="relative w-full h-full">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-t-xl"></div>
                  )}
                  <img
                    src={`https://image.tmdb.org/t/p/original${selectedCollection.backdrop_path}`}
                    alt={selectedCollection.name}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    style={{
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>

                <motion.button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-gray-900/80 hover:bg-red-600 p-2 rounded-full cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes size={24} />
                </motion.button>

                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h2
                    className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-2xl leading-tight"
                    variants={itemVariants}
                  >
                    {selectedCollection.name}
                  </motion.h2>
                  <motion.p
                    className="text-gray-200 text-sm max-w-3xl line-clamp-2 drop-shadow-lg"
                    variants={itemVariants}
                  >
                    {selectedCollection.overview}
                  </motion.p>
                </div>
              </div>

              {/* Conteúdo do Modal - Área de Scroll */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Lista de Filmes */}
                  <div className="space-y-3">
                    {selectedCollection.parts.map((movie, index) => (
                      <motion.div
                        key={movie.id}
                        className="bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-all duration-300 group border border-gray-700"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3">
                          {/* Número e Poster */}
                          <div className="flex items-start gap-3 flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center font-bold text-sm mt-0.5 shadow-lg">
                              {index + 1}
                            </div>
                            <img
                              src={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                                  : '/placeholder-movie.jpg'
                              }
                              alt={movie.title}
                              className="w-16 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-lg"
                            />
                          </div>

                          {/* Informações do Filme */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1 transition-colors leading-tight">
                              {movie.title}
                            </h3>

                            <div className="flex items-center gap-4 mb-2 flex-wrap">
                              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                <FaStar className="text-yellow-400" />
                                <span className="font-medium">
                                  {movie.vote_average.toFixed(1)}
                                </span>
                              </div>

                              {movie.release_date && (
                                <div className="flex items-center gap-1 text-blue-400 text-sm">
                                  <FaCalendarAlt className="text-blue-400" />
                                  <span className="font-medium">
                                    {new Date(movie.release_date).getFullYear()}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Descrição do Filme */}
                            {movie.overview && (
                              <p className="text-gray-300 text-xs line-clamp-2 mb-2 leading-relaxed">
                                {movie.overview}
                              </p>
                            )}
                            <div
                              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                              onClick={() => handleMovieClick(movie.id)}
                            >
                              <FaExternalLinkAlt size={10} />
                              <span>Ver detalhes</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
