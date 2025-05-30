import React, { useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Plus, Tv } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { AnimeItem, ApiResponseSuccess } from "@/types";

interface BannerProps {
  apiResponse: ApiResponseSuccess<AnimeItem[]>;
}

const Hero: React.FC<AnimeItem> = ({ title, year, synopsis, cover, url, id }) => {
  return (
    <section className="relative mb-3 h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={cover || "/placeholder.svg?height=600&width=1200"}
          alt="Featured Anime"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="container relative mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-orange-500 text-black">
              Recomendado
            </Badge>
          </div>

          <h1 className="text-5xl font-bold md:text-7xl">{title}</h1>

          <p
            className="flex items-center gap-1 text-sm text-gray-400"
            style={{ marginBottom: "-15px" }}
          >
            <Tv size={14} /> TV-MA • {year}
          </p>

          <p
            className="line-clamp-5 max-w-xl text-lg text-gray-300"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {synopsis}
          </p>

          <div className="mt[40px] flex items-center space-x-4" style={{ marginTop: "40px" }}>
            <Link href={`/watch/${id}`}>
              <Button
                size="lg"
                className="bg-orange-500 font-semibold text-black hover:bg-orange-600"
              >
                <Play className="mr-2 h-5 w-5" />
                Ver ahora
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-black hover:bg-gray-800"
            >
              <Plus className="mr-2 h-5 w-5" />
              Agregar a mi lista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export const Banner: React.FC<BannerProps> = ({ apiResponse }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
      >
        {apiResponse.data.map((anime) => (
          <SwiperSlide key={anime.id}>
            <Hero {...anime} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-6 flex justify-center gap-2">
        {apiResponse.data.map((_, index) => (
          <div
            key={index}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-8 bg-orange-500 opacity-100" : "w-4 bg-gray-400 opacity-50"
            }`}
            onClick={() => {
              swiperRef.current.slideTo(index);
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
