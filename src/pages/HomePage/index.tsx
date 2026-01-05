import TrendingHero from '../../layout/components/TrendingHero';
import Banner from '../../layout/components/Banner';
import ReleasedSoon from '../../layout/components/ReleasedSoon';
import { useEffect } from 'react';
import { useSearch } from '../../context/FiltroContext';
import CollectionsSection from '../../layout/components/CollectionsSection';

export default function HomePage() {
  const { setFiltros } = useSearch();

  useEffect(() => {
    setFiltros({ query: '', type: 'multi' });
  }, [setFiltros]);

  return (
    <div className="max-w-[2080px] mx-auto">
      <Banner />
      <TrendingHero />
      <ReleasedSoon />
      <CollectionsSection />
    </div>
  );
}
