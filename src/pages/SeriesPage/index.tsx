import { useEffect } from "react";
import { useSearch } from "../../context/FiltroContext";
import HeroBannerSeries from "../../layout/components/HeroBannerSeries";

export default function SeriesPage() {
  const { setFiltros } = useSearch();

  useEffect(() => {
    setFiltros({ query: "", type: "tv" });
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-black min-h-screen text-white">
      <HeroBannerSeries />
    </div>
  );
}
