import { BiSearch } from "react-icons/bi";
import { useSearch } from "../../context/FiltroContext";
import { GiPopcorn } from "react-icons/gi";
import CardPerson from "../../components/CardPerson";
import CardSerie from "../../components/CardSerie";
import CardMovie from "../../components/CardMovie";
import CardMulti from "../../components/CardMulti";

export default function SearchPage() {
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
  } = useSearch();
 
  return (
    <section className="container mx-auto p-6">
      {loading && !isFetchingMore ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-transparent border-t-red-600 border-r-red-600 rounded-full animate-spin" />
            <GiPopcorn
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600"
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

          {(listMovie && listMovie.length > 0) ||
          (listPerson && listPerson.length > 0) ||
          (listSerie && listSerie.length > 0) ||
          (listMulti && listMulti.length > 0) ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filtros.type === "person" &&
                  listPerson?.map((item) => (
                    <CardPerson key={item.id} person={item} />
                  ))}
                {filtros.type === "tv" &&
                  listSerie?.map((item) => (
                    <CardSerie key={item.id} serie={item} />
                  ))}
                {filtros.type === "movie" &&
                  listMovie?.map((item) => (
                    <CardMovie key={item.id} movie={item} />
                  ))}
                {filtros.type === "multi" &&
                  listMulti?.map((item) => (
                    <CardMulti key={item.id} item={item} />
                  ))}
              </div>

              {/* Âncora invisível para scroll suave */}
              <div id="load-more-anchor" className="mt-4" />

              {hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    onClick={async () => {
                      await fetchMore();
                      const anchor =
                        document.getElementById("load-more-anchor");
                      anchor?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
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
