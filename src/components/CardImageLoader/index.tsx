import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CardImageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
      <AiOutlineLoading3Quarters className="animate-spin text-white text-3xl" />
    </div>
  );
}
