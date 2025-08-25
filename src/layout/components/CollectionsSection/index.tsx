import { useEffect, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPlus,
  FaFire,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
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
}

const API_KEY = 'c82e5a4a26d33a1e3ca752a5daa59d54';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function CollectionsSection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // IDs de algumas coleções populares no TMDB
        const collectionIds = [
          10, // Star Wars
          1241, // Harry Potter
          86311, // The Avengers
          9485, // James Bond
          295, // Pirates of the Caribbean
          119, // The Lord of the Rings
        ];

        const collectionPromises = collectionIds.map((id) =>
          axios.get(`${BASE_URL}/collection/${id}`, {
            params: {
              api_key: API_KEY,
              language: 'pt-BR',
            },
          })
        );

        const responses = await Promise.all(collectionPromises);
        const collectionsData = responses.map((res) => res.data);

        setCollections(collectionsData);
      } catch (err) {
        console.error('Erro ao buscar coleções:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
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
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-2 h-8 bg-red-600 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaFire className="text-red-500" />
            Coleções em Destaque
          </h3>
        </div>

        {/* Slider de Coleções */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.collection-swiper-button-next',
            prevEl: '.collection-swiper-button-prev',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 16 },
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="relative"
        >
          {collections.map((collection) => (
            <SwiperSlide
              key={collection.id}
              className="rounded-xl overflow-hidden"
            >
              <div className="relative group rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300 h-80">
                {/* Imagem de fundo */}
                <img
                  src={`https://image.tmdb.org/t/p/w1280${collection.backdrop_path}`}
                  alt={collection.name}
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>

                {/* Conteúdo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {collection.name}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {collection.overview}
                  </p>

                  {/* Contador de filmes */}
                  <div className="flex items-center text-sm text-red-400 mb-4">
                    <span>{collection.parts.length} filmes na coleção</span>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                      <FaPlay className="mr-2" /> Assistir
                    </button>
                    <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                      <FaPlus className="mr-2" /> Lista
                    </button>
                  </div>
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </SwiperSlide>
          ))}

          {/* Botões de navegação */}
          <button className="collection-swiper-button-next absolute top-1/2 right-2 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-900/80 hover:bg-red-600 rounded-full transition-colors border border-gray-700">
            <FaChevronRight className="text-white" />
          </button>
          <button className="collection-swiper-button-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-900/80 hover:bg-red-600 rounded-full transition-colors border border-gray-700">
            <FaChevronLeft className="text-white" />
          </button>
        </Swiper>
      </div>
    </section>
  );
}
