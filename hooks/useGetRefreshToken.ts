import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useGetRefreshToken = () => {
  const { getToken, isSignedIn } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        const freshToken = await getToken();

        setToken(freshToken);
      }
    };

    fetchToken();
  }, [isSignedIn, getToken]);

  return { token, isSignedIn };
};
