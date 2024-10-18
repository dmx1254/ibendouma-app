import React, { useMemo, useState } from "react";
import GameSwiper from "@/components/GameSwiper";
import { router, usePathname } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { serverCat } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { SellServerType } from "@/types/type";
import { ActivityIndicator } from "react-native";
import SellServer from "@/components/SellServer";

const SellKamas = () => {
  const pathname = usePathname();
  const [item, setItem] = useState<string>("all-servers");

  const fetchServers = async (): Promise<SellServerType[]> => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_IBYTRADE_CLIENT_URL}/server`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    isLoading,
    error,
    data: servers,
  } = useQuery<SellServerType[], Error>({
    queryKey: ["servers-selled"],
    queryFn: fetchServers,
  });

  // console.log(servers);

  const filteredServers = useMemo(() => {
    if (!servers) return [];
    if (item === "all-servers") return servers.sort(() => Math.random() - 0.5);
    return servers.filter((server) => server.serverCategory === item);
  }, [servers, item]);

  return (
    <View className="flex-1 w-full bg-primary-500">
      <View className="w-full">
        <GameSwiper pathname={pathname} />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-10 left-6 bg-primary-300 rounded-full p-2"
        >
          <Ionicons name="arrow-back" size={24} color="#FFA000" />
        </TouchableOpacity>
      </View>

      <View className="w-full flex-row items-center justify-between my-6 p-3">
        {serverCat.map((servCat) => (
          <TouchableOpacity
            key={servCat.id}
            className={`font-bold rounded-full ${item === servCat.slug ? "bg-secondary-500" : "bg-primary-200"} p-1.5`}
            onPress={() => setItem(servCat.slug)}
          >
            <Text
              className={`${item === servCat.slug ? "text-white" : "text-secondary-50"} p-0.5`}
            >
              {servCat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="mt-2 flex-1 self-center">
        <FlatList
          data={filteredServers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SellServer item={item} />}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 30,
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
        />
      </View>
    </View>
  );
};

export default SellKamas;
