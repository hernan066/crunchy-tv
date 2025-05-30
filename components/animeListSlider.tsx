import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeItem, ApiResponseSuccess } from "@/types";

interface ListAnimeProps {
  apiResponse: ApiResponseSuccess<AnimeItem[]>;
  titleSection: string;
}
export const AnimeListSlider = ({ apiResponse, titleSection }: ListAnimeProps) => {
  const swiperRef = useRef<any>(null);

  // Helper to get current slidesPerView from Swiper instance
  const getSlidesPerView = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      return swiperRef.current.swiper.params.slidesPerView as number;
    }
    // fallback to 2 (mobile)
    return 2;
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const slidesPerView = getSlidesPerView();
      swiperRef.current.swiper.slideTo(
        Math.max(swiperRef.current.swiper.activeIndex - slidesPerView, 0),
        700 // duración de la transición en ms
      );
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const slidesPerView = getSlidesPerView();
      swiperRef.current.swiper.slideTo(
        swiperRef.current.swiper.activeIndex + slidesPerView,
        700 // duración de la transición en ms
      );
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{titleSection}</h2>
        <Button
          variant="ghost"
          className="text-orange-500 hover:border hover:border-orange-500 hover:bg-transparent hover:text-orange-400"
        >
          Ver todos
        </Button>
      </div>
      <div className="relative">
        <button
          aria-label="Anterior"
          className="absolute left-[-50px] top-1/2 z-10 -translate-y-1/2 transform rounded-lg border border-gray-600 bg-black/70 p-2 opacity-50 shadow-md transition-all duration-200 hover:bg-black/80 hover:opacity-100"
          onClick={handlePrev}
          type="button"
        >
          <ChevronLeft className="h-6 w-6 text-orange-400 transition-colors group-hover:text-white" />
        </button>
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            500: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
          loop
          className="!pb-4"
        >
          {apiResponse.data.map((anime) => (
            <SwiperSlide key={anime.id}>
              <Link href={`/watch/${anime.id}`}>
                <Card className="group cursor-pointer border-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={anime.cover || "/placeholder.svg"}
                        alt={anime.title}
                        width={200}
                        height={350}
                        className="h-[350px] w-full rounded-lg object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      {anime.position && (
                        <h3 className="line-clamp-2 text-center text-sm font-semibold text-white">
                          {`#${anime.position} - ${anime.title}`}
                        </h3>
                      )}
                      {!anime.position && (
                        <h3 className="line-clamp-2 text-center text-sm font-semibold text-white">
                          {`${anime.title}`}
                        </h3>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          aria-label="Siguiente"
          className="absolute right-[-50px] top-1/2 z-10 -translate-y-1/2 transform rounded-lg border border-gray-600 bg-black/70 p-2 opacity-50 shadow-md transition-all duration-200 hover:bg-black/80 hover:opacity-100"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight className="h-6 w-6 text-orange-400 transition-colors group-hover:text-white" />
        </button>
      </div>
    </section>
  );
};
