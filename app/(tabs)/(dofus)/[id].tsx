import {
  View,
  Text,
  Dimensions,
  ImageProps,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import Server from "@/components/Server";
import { ActivityIndicator } from "react-native";
import { getImg } from "@/lib/utils";

const DofusServerPage = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const w = Dimensions.get("screen").width;

  const { isLoading, error, data } = useQuery({
    queryKey: ["myData"],
    queryFn: async () =>
      await fetch(`https://services.ibendouma.com/api/server`).then((res) =>
        res.json()
      ),
  });
  if (error) {
    console.log(error.message);
  }
  // return (
  //   <Text className="text-black mt-44">
  //     Une erreur est survenue: {error.message}
  //   </Text>
  // );

  //   console.log(data);

  return (
    <View className="w-full flex-1 bg-primary-500 p-2 font-Lato">
      <View className="relative">
        <Image
          source={getImg(id) as ImageProps}
          style={{
            width: w,
            height: 240,
            objectFit: "cover",
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-7 left-2 rotate-180 bg-black/30 p-2 rounded-full"
        >
          <Icon name="arrow-right-alt" size={42} color="#FFA000" />
        </TouchableOpacity>
        <Text className="text-yellow-500 text-2xl font capitalize mt-4">
          Server - {id.split("-").join(" ")}
        </Text>
      </View>
      <View className="mt-4 flex-1 self-center">
        <FlatList
          data={data}
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
      {/* <Text className="text-white">{JSON.stringify(data, null, 2)}</Text> */}
    </View>
  );
};

export default DofusServerPage;
