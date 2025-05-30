"use client";
import { useState } from "react";
import { Bookmark, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navbar } from "@/components/navbar";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";
import { useGetHistoryQuery, useGetMyListQuery } from "@/store/services/userApi";
import { Loader } from "@/components/loader";
import { EpisodesList } from "@/components/episodesList";
import { AnimeList } from "@/components/animeList";

export default function MyListPage() {
  const { token, isSignedIn } = useGetRefreshToken();
  const [activeTab, setActiveTab] = useState("my-list-tab");
  const { data: history = null, isLoading: l1 } = useGetHistoryQuery(token!, {
    skip: !token,
  });
  const { data: myListData = null, isLoading: l2 } = useGetMyListQuery(token!, {
    skip: !token,
  });

  const tabs = [
    { id: "my-list-tab", label: "MI LISTA" },
    { id: "history-tab", label: "HISTORIAL" },
  ];

  if (isSignedIn && (l1 || l2 || !history)) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-[100px]">
        {/* Page Title */}
        <div className="mb-8 flex items-center justify-center">
          <Bookmark className="mr-3 h-6 w-6" />
          <h1 className="text-3xl font-bold">Mis Listas</h1>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Header */}
        <div className="mb-6 flex items-center justify-between">
          {activeTab === "history-tab" && (
            <h2 className="text-xl font-semibold">Actividad reciente</h2>
          )}
          {activeTab === "my-list-tab" && <h2 className="text-xl font-semibold">Favoritos</h2>}

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  ACTIVIDAD RECIENTE
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-gray-700 bg-gray-900 text-gray-400">
                <DropdownMenuItem>Actividad reciente</DropdownMenuItem>
                <DropdownMenuItem>Alfabético A-Z</DropdownMenuItem>
                <DropdownMenuItem>Alfabético Z-A</DropdownMenuItem>
                <DropdownMenuItem>Fecha agregado</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">
                  <Filter className="mr-2 h-4 w-4" />
                  FILTROS
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-gray-700 bg-gray-900 text-gray-400">
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>En progreso</DropdownMenuItem>
                <DropdownMenuItem>Completados</DropdownMenuItem>
                <DropdownMenuItem>Por ver</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Anime Grid */}
        {activeTab === "history-tab" && history && (
          <EpisodesList apiResponse={history} barProgress={true} canItBeDelete={true} />
        )}
        {activeTab === "my-list-tab" && myListData && (
          <AnimeList apiResponse={myListData} viewRating={true} />
        )}
      </main>
    </div>
  );
}
