import { View, Text, FlatList } from "react-native";
import React, { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Server from "@/components/Server";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { serverCat } from "@/lib/utils";
import { ServerP } from "@/types/type";

const Dofus = () => {
  const [item, setItem] = useState<string>("all-servers");

  const fetchServers = async (): Promise<ServerP[]> => {
    const response = await fetch(`https://services.ibendouma.com/api/server`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    isLoading,
    error,
    data: servers,
  } = useQuery<ServerP[], Error>({
    queryKey: ["servers"],
    queryFn: fetchServers,
  });

  const filteredServers = useMemo(() => {
    if (!servers) return [];
    if (item === "all-servers") return servers.sort(() => Math.random() - 0.5);
    return servers.filter((server) => server.serverCategory === item);
  }, [servers, item]);

  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <View className="flex-1 flex-col items-start py-4 px-2">
      {/* <View className="mb-4 self-center">
        <Text className="text-white font-extrabold text-6xl">
          Shopping Servers - All servers
        </Text>
      </View> */}
      <View className="w-full flex-row items-center justify-between mb-6 mt-4">
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
          renderItem={({ item }) => <Server item={item} />}
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

export default Dofus;
