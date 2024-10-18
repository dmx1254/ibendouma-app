import * as SecureStore from "expo-secure-store";
import { useQuery } from "@tanstack/react-query";

export const useCheckToken = () => {
  const fetchServers = async () => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_IBENDOUMA_CLIENT_URL}/users/verifyToken`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["token"],
    queryFn: fetchServers,
  });
  return data;
};
