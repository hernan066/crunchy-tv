import { AnimeItem, ApiResponseSuccess } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3040/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSlider: builder.query<ApiResponseSuccess<AnimeItem[]>, void>({
      query: () => "/ninja/getSlider",
    }),
    getLastUpdate: builder.query<ApiResponseSuccess<AnimeItem[]>, void>({
      query: () => "/ninja/lastUpdate",
    }),
    getLastEpisodes: builder.query<ApiResponseSuccess<AnimeItem[]>, void>({
      query: () => "/ninja/lastEpisodes",
    }),
    getPopular: builder.query<ApiResponseSuccess<AnimeItem[]>, void>({
      query: () => "/ninja/popular",
    }),
    getSearch: builder.query<ApiResponseSuccess<AnimeItem[]>, string>({
      query: (name) => `/anime/search?name=${name}`,
    }),
    getAnimeDetails: builder.query<ApiResponseSuccess<AnimeItem>, string>({
      query: (slug) => `/ninja/info/${slug}`,
    }),
  }),
});

export const {
  useGetSliderQuery,
  useGetLastUpdateQuery,
  useGetLastEpisodesQuery,
  useGetPopularQuery,
  useGetSearchQuery,
  useGetAnimeDetailsQuery,
} = api;
