"use client";
import Link from "next/link";
import React from "react";
import { Search, Menu, User, Bookmark } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  // Nuevo estado para opacidad gradual
  const [headerOpacity, setHeaderOpacity] = React.useState(0);
  const [animeToSearch, setAnimeToSearch] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Gradual entre 90vh y 100vh
      if (scrollY < 0.9 * vh) {
        setHeaderOpacity(0);
        setScrolled(false);
      } else if (scrollY >= 0.9 * vh && scrollY <= vh) {
        const progress = (scrollY - 0.9 * vh) / (0.1 * vh);
        setHeaderOpacity(progress);
        setScrolled(false);
      } else {
        setHeaderOpacity(1);
        setScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300`}>
      <div
        className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300"
        style={{
          background:
            headerOpacity > 0
              ? `rgba(0,0,0,${headerOpacity})`
              : "linear-gradient(to bottom, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.1) 100%)",
          backdropFilter: headerOpacity > 0 ? undefined : "blur(5px)",
          opacity: 1,
        }}
      />
      <div className="container relative mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/crunchyTv_logo.png" alt="Logo" className="h-10" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden cursor-pointer items-center space-x-2 md:flex">
              <Search
                className="h-5 w-5 text-gray-400"
                onClick={() => {
                  if (animeToSearch.trim() !== "") {
                    window.location.href = `/search?query=${encodeURIComponent(animeToSearch)}`;
                  }
                }}
              />
              <Input
                type="text"
                value={animeToSearch}
                onChange={(e) => setAnimeToSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && animeToSearch.trim() !== "") {
                    window.location.href = `/search?query=${encodeURIComponent(animeToSearch)}`;
                  }
                }}
                placeholder="Buscar anime..."
                className="w-64 border-gray-700 bg-gray-900 bg-opacity-25 text-white placeholder-gray-400 outline-none"
              />
            </div>
            <Link href="/my-list">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-5 w-5" />
              </Button>
            </Link>
            {/*  <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button> */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
