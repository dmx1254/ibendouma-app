import useStore from "@/lib/store";
import { getServerImg } from "@/lib/utils";
import { ServerP } from "@/types/type";
import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ImageProps } from "react-native";

interface ServerProps {
  item: ServerP;
}

const Server: React.FC<ServerProps> = ({ item }) => {
  const { devise } = useStore();
  return (
    <Link
      href={{
        pathname: "/server/[id]",
        params: { id: `${item.serverCategory}-${item._id}` },
      }}
    >
      <View className="relative flex flex-col items-start shadow-lg rounded-[10px] overflow-hidden">
        <Image
          source={getServerImg(item.serverCategory) as ImageProps}
          resizeMode="cover"
          className="w-48 h-32 object-cover object-center"
        />

        <View className="w-full absolute inset-0 bg-white/20 bg-opacity-40 bottom-0 left-0 right-0 flex-row items-center justify-between h-12 px-1">
          <View className="flex items-center justify-center bg-primary-200 rounded-full px-1.5 py-1.5">
            <Text className="text-secondary-500 text-xs font-bold">
              {item.serverName}
            </Text>
          </View>
          <View className="flex-row items-center justify-center bg-white bg-opacity-80 px-1.5 py-1 rounded-full">
            <Text className="text-secondary-500 text-sm font-bold mr-1">
              {devise.currencyName === "euro" && "EUR"}
              {devise.currencyName === "dollar" && "USD"}
              {devise.currencyName === "mad" && "MAD"}
              {(item.serverPrice / devise.curencyVal).toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default Server;
