"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/loader";
import { useRouter, useSearchParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const VideoPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Obtener parámetros de la URL
  const name = searchParams.get("name");
  const chapter = searchParams.get("chapter");
  const option = searchParams.get("option") || "0";

  useEffect(() => {
    if (!name || !chapter) return;
    setLoading(true);

    const getData = async () => {
      try {
        const res1 = await axios.get(
          `${API}/anime/videos?name=${encodeURIComponent(
            name
          )}&chapter=${encodeURIComponent(chapter)}`
        );
        setData(res1.data.data);
      } catch (e) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [name, chapter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Backspace") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  useEffect(() => {
    if (data) {
      console.log(data);
      router.replace(data.videos[option]);
    }
  }, [router, data]);

  if (loading) {
    return <Loader />;
  }

  if (data) {
    return null;
  }

  /*   return (
    <>
      {loading && <Loader />}
      {!loading && data && (
        <section className="flex h-screen w-screen items-center justify-center bg-black">
          <iframe
            ref={iframeRef}
            src={`${data.videos[option]}?autoplay=1`}
            title="Video"
            className="h-full w-full border-none"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </section>
      )}
    </>
  ); */
};

export default VideoPage;
