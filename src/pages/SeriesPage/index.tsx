import HeroBanner from "../../components/HeroCarousel";
import RecommendationsSection from "../../layout/components/SeriesRow";

export default function SeriesPage() {
  return (
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-black min-h-screen text-white">
      <HeroBanner />

        <RecommendationsSection seriesId={65701} />

    </div>
  );
}
