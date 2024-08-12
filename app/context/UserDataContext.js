"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ApiDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.username) {
        try {
          const username = session.user.username;
          const response = await fetch(
            `https://api.github.com/users/${username}`
          );

          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }

          const data = await response.json();
          setUserData(data);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      } else if (status === "loading") {
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  return (
    <ApiDataContext.Provider value={{ userData, loading, error }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export function useApiDataContext() {
  return useContext(ApiDataContext);
}
