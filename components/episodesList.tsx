import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Play, Trash2 } from "lucide-react";
import Link from "next/link";
import { AnimeItem, ApiResponseSuccess } from "@/types";
import { Button } from "./ui/button";

interface ListAnimeProps {
  apiResponse: ApiResponseSuccess<AnimeItem[]>;
  barProgress: boolean;
  canItBeDelete: boolean;
}

export const EpisodesList = ({ apiResponse, barProgress, canItBeDelete }: ListAnimeProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {apiResponse.data.map((anime, index) => (
        <Card
          key={index}
          className="group cursor-pointer overflow-hidden border-gray-800 bg-gray-900 transition-transform hover:scale-105"
        >
          <Link href={`/watch/${anime.id}`}>
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={anime.cover || "/placeholder.svg"}
                  alt={anime.title}
                  width={300}
                  height={200}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-12 w-12 text-white" />
                </div>
                {barProgress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div className="h-full bg-orange-500" style={{ width: `${anime.chapter}%` }} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="truncate font-semibold text-white" title={anime.title}>
                  {anime.title}
                </h3>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-400">{`Capítulo ${anime.chapter}`}</p>
                  {canItBeDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-gray-400 hover:bg-red-800 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
};
