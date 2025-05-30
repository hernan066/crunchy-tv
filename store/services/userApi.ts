// services/userApi.ts

import { AnimeItem } from "@/types";
import { ApiResponseSuccess } from "@/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ParamValue } from "next/dist/server/request/params";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3040/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getHistory: builder.query<ApiResponseSuccess<AnimeItem[]>, string>({
      query: (token) => ({
        url: "/user/history",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getMyList: builder.query<ApiResponseSuccess<AnimeItem[]>, string>({
      query: (token) => ({
        url: "/user/my-list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getItsOnMyList: builder.query<any, { token: string | null; slug: ParamValue }>({
      query: ({ token, slug }) => ({
        url: `/user/my-list/its-on-my-list/${slug}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    removeAnimeFromList: builder.mutation<
      void,
      {
        token: string;
        slug: ParamValue;
      }
    >({
      query: ({ token, slug }) => ({
        url: `/user/my-list/${slug}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    addHistory: builder.mutation<
      void,
      {
        body: {
          id: any;
          cover: string;
          title: string;
          rating: number;
          chapter: number;
          episodes: number;
        };
        token: string;
      }
    >({
      query: ({ body, token }) => ({
        url: "/user/history",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addMyList: builder.mutation<
      void,
      {
        body: {
          id: any;
          cover: string;
          title: string;
          rating: number;
          chapter: number;
          episodes: number;
        };
        token: string;
      }
    >({
      query: ({ body, token }) => ({
        url: "/user/my-list",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useAddHistoryMutation,
  useAddMyListMutation,
  useGetMyListQuery,
  useGetItsOnMyListQuery,
  useRemoveAnimeFromListMutation,
} = userApi;
