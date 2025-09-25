import { useEffect, useState } from "react";

export const getUser = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export const useGetUser = (userId: string) => {
  const [data, setData] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    getUser(userId)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  return data;
};
