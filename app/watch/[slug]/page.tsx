"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Bookmark, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Loader } from "@/components/loader";
import {
  useAddHistoryMutation,
  useAddMyListMutation,
  useGetItsOnMyListQuery,
  useRemoveAnimeFromListMutation,
} from "@/store/services/userApi";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";
import { useGetAnimeDetailsQuery } from "@/store/services/animeApi";
import { SignedIn } from "@clerk/nextjs";

export default function DetailsPage() {
  const { slug } = useParams();

  const router = useRouter();
  const { token, isSignedIn } = useGetRefreshToken();
  const [episode, setEpisode] = useState(1);
  const [option, setOption] = useState(0);
  const [isOnList, setIsOnList] = useState(false);

  const { data: apiResponse, isLoading: loadingAnimeDetails } = useGetAnimeDetailsQuery(
    typeof slug === "string" ? slug : ""
  );
  const { data: apiResponse2, isLoading: loadingItsOnMyList } = useGetItsOnMyListQuery({
    token,
    slug,
  });

  const [addHistory] = useAddHistoryMutation();
  const [removeAnimeFromList] = useRemoveAnimeFromListMutation();

  const [addMyList, { isLoading: loadingMyListAdd }] = useAddMyListMutation();

  useEffect(() => {
    if (apiResponse2) {
      setIsOnList(apiResponse2.data.itsOnMyList);
    }
  }, [apiResponse2]);

  const handleAddEpisodes = () => {
    if (apiResponse?.data?.episodes && episode < apiResponse.data.episodes) {
      setEpisode((prev) => +prev + 1);
    }
  };

  const handleRestEpisodes = () => {
    if (episode > 1) {
      setEpisode((prev) => +prev - 1);
    }
  };

  const handleAddOption = () => {
    if (option <= 5) {
      setOption((prev) => prev + 1);
    }
  };

  const handleRestOption = () => {
    if (option > 0) {
      setOption((prev) => prev - 1);
    }
  };

  const handlePlay = async () => {
    try {
      if (isSignedIn && token && apiResponse) {
        await addHistory({
          body: {
            id: slug,
            cover: apiResponse.data.cover,
            title: apiResponse.data.title,
            rating: apiResponse.data.rating || 0,
            chapter: episode,
            episodes: apiResponse.data.episodes || 0,
          },
          token,
        });
      }
    } catch (err) {
      console.error("Error al guardar en historial:", err);
      // No detenemos la navegación
    } finally {
      router.push(`/video?name=${slug}&chapter=${episode}&option=${option}`);
    }
  };

  const handleAddMyList = async () => {
    try {
      if (isSignedIn && token && apiResponse) {
        const res = await addMyList({
          body: {
            id: slug,
            cover: apiResponse.data.cover,
            title: apiResponse.data.title,
            rating: apiResponse.data.rating || 0,
            chapter: episode,
            episodes: apiResponse.data.episodes || 0,
          },
          token,
        });
        if (!res.error) {
          setIsOnList(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveMyList = async () => {
    if (isSignedIn && token && apiResponse) {
      const res = await removeAnimeFromList({
        token,
        slug,
      });
      if (!res.error) {
        setIsOnList(false);
      }
    }
  };

  if (loadingAnimeDetails || loadingItsOnMyList) {
    return <Loader />;
  }
  if (!apiResponse) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        No se encontró el anime
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src={apiResponse.data.cover}
          alt="One Piece Background"
          fill
          className="object-cover blur-2xl"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Navbar />

      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="container relative z-10 mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <h1 className="text-5xl font-bold md:text-6xl">{apiResponse.data.title}</h1>

              <div className="flex flex-wrap gap-2">
                {apiResponse.data.genres &&
                  apiResponse.data.genres.map((genre, index) => (
                    <Badge
                      key={index}
                      className="bg-orange-500 px-3 py-1 text-black hover:bg-orange-600"
                    >
                      {genre}
                    </Badge>
                  ))}
              </div>

              <div className="max-w-3xl">
                <p className="text-lg leading-relaxed text-gray-300">{apiResponse.data.synopsis}</p>
              </div>

              <button
                onClick={handlePlay}
                className="flex w-[400px] items-center justify-center gap-[5px] rounded-[10px] border border-[#616161] bg-[#4242426c] p-[12px] text-[20px] text-white transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
              >
                <Play />
                Play
              </button>

              <div className="relative flex h-[50px] w-[400px] items-center justify-center rounded-[10px] border border-[#616161] bg-[#4242424d] text-center text-[20px] text-white">
                <button
                  onClick={handleRestEpisodes}
                  className="absolute left-0 top-0 h-[50px] w-[50px] rounded-bl-[10px] rounded-tl-[10px] border-none bg-[#f1f1f1] text-[25px] text-black transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
                >
                  -
                </button>
                <p>{`Capitulo ${episode} / ${apiResponse.data?.episodes}`}</p>
                <button
                  onClick={handleAddEpisodes}
                  className="absolute right-0 top-0 h-[50px] w-[50px] rounded-br-[10px] rounded-tr-[10px] border-none bg-[#f1f1f1] text-[25px] text-black transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
                >
                  +
                </button>
              </div>

              <div className="relative flex h-[50px] w-[400px] items-center justify-center rounded-[10px] border border-[#616161] bg-[#4242424d] text-center text-[20px] text-white">
                <button
                  onClick={handleRestOption}
                  className="absolute left-0 top-0 h-[50px] w-[50px] rounded-bl-[10px] rounded-tl-[10px] border-none bg-[#f1f1f1] text-[25px] text-black transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
                >
                  -
                </button>
                <p>{`Reproductor ${+option + 1}`}</p>
                <button
                  onClick={handleAddOption}
                  className="absolute right-0 top-0 h-[50px] w-[50px] rounded-br-[10px] rounded-tr-[10px] border-none bg-[#f1f1f1] text-[25px] text-black transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
                >
                  +
                </button>
              </div>

              <SignedIn>
                {isOnList ? (
                  <button
                    disabled={loadingMyListAdd ? true : false}
                    onClick={handleRemoveMyList}
                    className="flex w-[400px] items-center justify-center gap-[5px] rounded-[10px] border border-[#616161] bg-[#4242426c] p-[12px] text-[20px] text-white transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
                  >
                    <Bookmark />
                    {loadingMyListAdd ? "Cargando..." : "Quitar de mi lista"}
                  </button>
                ) : (
                  <button
                    disabled={loadingMyListAdd ? true : false}
                    onClick={handleAddMyList}
                    className="flex w-[400px] items-center justify-center gap-[5px] rounded-[10px] border border-[#616161] bg-[#4242426c] p-[12px] text-[20px] text-white transition-all hover:bg-orange-400 hover:text-[#111] focus:bg-orange-400 focus:text-[#111]"
                  >
                    <Bookmark />
                    {loadingMyListAdd ? "Cargando..." : "Añadir a mi lista"}
                  </button>
                )}
              </SignedIn>
            </div>

            <div className="lg:col-span-1" style={{ alignSelf: "center" }}>
              <div className="relative max-w-[400px]">
                <img src={apiResponse.data.cover} alt="One Piece Poster" className="w-full" />

                <div className="flex place-content-between bg-orange-500 p-4 text-lg font-semibold text-black">
                  <p className="text-white">En emisión</p>
                  <p className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-white" />
                    <span className="font-bold text-white">4.6</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
