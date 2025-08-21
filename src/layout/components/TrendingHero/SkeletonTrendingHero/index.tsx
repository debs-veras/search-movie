import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SkeletonTrendingHero() {
  return (
    <section className="relative w-full max-h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="relative z-10 px-4 pt-10 pb-14 sm:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-6 h-6 bg-red-400 rounded-full"></div>
            <div className="h-6 bg-gray-700 rounded w-40"></div>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          className="w-full"
          breakpoints={{
            0: { slidesPerView: 1.3 },
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5 },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="rounded-xl overflow-hidden w-[180px] sm:w-[200px] md:w-[220px]"
            >
              <div className="animate-pulse">
                <div className="relative">
                  {/* Ranking skeleton */}
                  <div className="absolute top-2 left-2 w-8 h-6 bg-gray-700 rounded-full z-10"></div>

                  {/* Imagem skeleton */}
                  <div className="w-full h-[300px] sm:h-[350px] bg-gray-800 rounded-xl"></div>

                  {/* Overlay skeleton */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <div className="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
                      <div className="h-3 bg-gray-700 rounded w-8"></div>
                      <div className="h-3 bg-gray-700 rounded w-8"></div>
                    </div>
                    <div className="h-3 bg-gray-700 rounded mb-1 w-full"></div>
                    <div className="h-3 bg-gray-700 rounded mb-1 w-2/3"></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
