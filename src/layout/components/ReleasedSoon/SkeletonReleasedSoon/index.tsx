export default function SkeletonReleasedSoon() {
  return (
    <section className="relative w-full max-h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <div className="relative z-10 px-4 pt-10 pb-14 sm:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="animate-pulse flex items-center gap-2">
            <div className="w-6 h-6 bg-red-400 rounded-full"></div>
            <div className="h-6 bg-gray-700 rounded w-40"></div>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 animate-pulse"
            >
              <div className="w-full max-h-90 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
