import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import Link from "next/link";
import { AnimeItem, ApiResponseSuccess } from "@/types";

interface ListAnimeProps {
  apiResponse: ApiResponseSuccess<AnimeItem[]>;
  viewRating: boolean;
}

export const AnimeList = ({ apiResponse, viewRating }: ListAnimeProps) => {
  console.log(apiResponse);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {apiResponse.data.map((anime, index) => (
        <Link key={anime.id} href={`/watch/${anime.id}`}>
          <Card
            key={index}
            className="group relative cursor-pointer overflow-hidden border-none bg-transparent"
          >
            {anime.type && (
              <div className="absolute -left-8 top-2 z-10 w-32 -rotate-45 bg-red-500 py-1 text-center text-xs font-bold tracking-wide text-white shadow-md">
                <p className="mr-2">{anime.type}</p>
              </div>
            )}

            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-lg">
                {viewRating && anime.rating && (
                  <div className="absolute bottom-2 right-2 z-10 rounded-sm bg-red-500 p-2 py-1 text-center text-xs font-bold tracking-wide text-white shadow-sm">
                    <p className="mr-2 flex gap-1">
                      <Star size={14} />
                      {anime.rating}
                    </p>
                  </div>
                )}
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
                <h3 className="line-clamp-2 text-center text-sm font-semibold text-white">
                  {anime.title}
                </h3>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
