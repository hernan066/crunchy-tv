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
import { ApiResponseSuccess } from "@/types/api";
import { AnimeItem } from "@/types/anime";
import { HistoryList } from "@/components/historyList";

export default function Home() {
  const { data: featuredAnime = [], isLoading: l1 } = useGetSliderQuery();
  const { data: latestAnime = [], isLoading: l2 } = useGetLastUpdateQuery();
  const { data: lastEpisodes, isLoading: l3 } = useGetLastEpisodesQuery();
  const { data: popular = [], isLoading: l4 } = useGetPopularQuery();

  if (l1 || l2 || l3 || l4) {
    return <Loader />;
  }

  return (
    <>
      {featuredAnime && latestAnime && lastEpisodes && popular && history && (
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Banner apiResponse={featuredAnime as ApiResponseSuccess<AnimeItem[]>} />

          <SignedIn>
            <HistoryList titleSection={"Continuar viendo..."} barProgress={true} />
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
