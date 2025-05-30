"use client";
import React from "react";
import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";
import { Loader } from "@/components/loader";
import { AnimeListSlider } from "@/components/animeListSlider";
import { EpisodesListSlider } from "@/components/episodesListSlider";
import { Footer } from "@/components/footer";
import {
  useGetSliderQuery,
  useGetLastUpdateQuery,
  useGetLastEpisodesQuery,
  useGetPopularQuery,
} from "@/store/services/animeApi";
import { SignedIn } from "@clerk/nextjs";
import { useGetHistoryQuery } from "@/store/services/userApi";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";
import { ApiResponseSuccess } from "@/types/api";
import { AnimeItem } from "@/types/anime";

export default function Home() {
  const { token, isSignedIn } = useGetRefreshToken();

  const { data: featuredAnime = [], isLoading: l1 } = useGetSliderQuery();
  const { data: latestAnime = [], isLoading: l2 } = useGetLastUpdateQuery();
  const { data: lastEpisodes, isLoading: l3 } = useGetLastEpisodesQuery();
  const { data: popular = [], isLoading: l4 } = useGetPopularQuery();
  const { data: history = null, isLoading: l5 } = useGetHistoryQuery(token!, {
    skip: !token,
  });

  if (isSignedIn && (l1 || l2 || l3 || l4 || !history)) {
    return <Loader />;
  }

  return (
    <>
      {featuredAnime && latestAnime && lastEpisodes && popular && history && (
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Banner apiResponse={featuredAnime as ApiResponseSuccess<AnimeItem[]>} />

          <SignedIn>
            {history.data.length > 0 && (
              <EpisodesListSlider
                apiResponse={history as ApiResponseSuccess<AnimeItem[]>}
                titleSection={"Continuar viendo..."}
                barProgress={true}
              />
            )}
          </SignedIn>
          <EpisodesListSlider
            apiResponse={lastEpisodes as ApiResponseSuccess<AnimeItem[]>}
            titleSection={"Últimos episodios agregados"}
            barProgress={false}
          />
          <AnimeListSlider
            apiResponse={popular as ApiResponseSuccess<AnimeItem[]>}
            titleSection={"Populares en emisión"}
          />
          <AnimeListSlider
            apiResponse={latestAnime as ApiResponseSuccess<AnimeItem[]>}
            titleSection={"Populares en emisión"}
          />

          <Footer />
        </div>
      )}
    </>
  );
}
