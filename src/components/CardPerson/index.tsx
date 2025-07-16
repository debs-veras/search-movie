import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { PersonResult } from "../../types/listResultsData.d";
import { API_URL_IMG_TMDB } from "../../constants/api";
import CardActionButton from "../CardActionButton";
import CardImageLoader from "../CardImageLoader";

type Props = {
  person: PersonResult;
};

export default function CardPerson({ person }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageUrl = `${API_URL_IMG_TMDB}w500${person.profile_path}`;

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.03]">
      <div className="relative h-72 md:h-80 w-full">
        {/* Loading Spinner */}
        {isLoading && <CardImageLoader />}

        {/* Imagem */}
        <img
          src={hasError ? "avatar.png" : imageUrl}
          alt={`Foto de perfil de ${person.name}`}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading="lazy"
        />

        {/* Overlay de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Informações */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between">
          <div className="text-white">
            <span className="text-lg font-semibold leading-tight line-clamp-2 mb-1">
              {person.name}
            </span>
            <p className="text-sm text-gray-300 drop-shadow-sm">
              {person.known_for_department}
            </p>
          </div>

          <span className="bg-green-600 text-white rounded-full p-2 shadow-md">
            <BiUserCircle size={18} />
          </span>
        </div>
        {/* Ação no hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-sm z-20">
          <CardActionButton
            text="Ver Detalhes"
            color="green"
            onClick={() => console.log("Assistir clicado")}
          />
        </div>
      </div>
    </div>
  );
}
