"use client";

import { Suspense, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { AnimeList } from "@/components/animeList";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSearchQuery } from "@/store/services/animeApi";
import { AnimeItem, ApiResponseSuccess } from "@/types";

function SearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: any = searchParams.get("query") ?? "";

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetSearchQuery(query, {
    skip: !query,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = searchInput.trim();
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    router.push("/search");
  };

  return (
    <div className="min-h-screen bg-black pt-[100px] text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto mb-12 max-w-4xl">
          <div className="relative">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar anime..."
              className="w-full border-none bg-transparent px-6 py-6 text-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-0"
              style={{ outline: "none" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
            {searchInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-orange-500"></div>
          </div>
        )}

        {error && (
          <div className="py-20 text-center">
            <h2 className="mb-2 text-2xl font-bold text-red-500">Error al buscar</h2>
            <p className="text-gray-500">
              No se pudo completar la búsqueda. Inténtalo de nuevo más tarde.
            </p>
          </div>
        )}

        {apiResponse && query && (
          <>
            <h2 className="mb-8 text-2xl font-bold">Resultado de búsqueda:</h2>
            <AnimeList
              apiResponse={apiResponse as ApiResponseSuccess<AnimeItem[]>}
              viewRating={true}
            />
          </>
        )}

        {!query && (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 h-16 w-16 text-gray-600" />
            <h2 className="mb-2 text-2xl font-bold text-gray-400">Busca tu anime favorito</h2>
            <p className="text-gray-500">
              Escribe en la barra de búsqueda para encontrar series, películas y más
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <SearchComponent />
    </Suspense>
  );
}
