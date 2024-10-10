import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageProps,
  Animated,
} from "react-native";
import { getServerImg } from "@/lib/utils";
import { WishList } from "@/types/type";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/lib/store";

export const WishlistItem = ({ item }: { item: WishList }) => {
  const { devise } = useStore();
  return (
    <Animated.View
      className="bg-primary-400 rounded-2xl p-4 mb-4 flex-row items-center shadow-lg"
      style={{
        shadowColor: "#FFA000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      }}
    >
      <Image
        source={getServerImg(item.serverCategory) as ImageProps}
        className="w-24 h-24 rounded-xl mr-4"
      />
      <View className="flex-1 justify-between">
        <Text className="text-white text-lg font-bold mb-1">
          {item.serverName}
        </Text>
        <Text className="text-gray-400 mb-1">{item.serverCategory}</Text>
        <Text className="text-yellow-500 font-bold text-xl">
          {(item.serverPrice / devise.curencyVal).toFixed(2)}
          {devise.currencyName === "euro" && "EUR"}
          {devise.currencyName === "dollar" && "USD"}
          {devise.currencyName === "mad" && "MAD"}
        </Text>
      </View>
      <Link
        href={{
          pathname: "/server/[id]",
          params: { id: `${item.serverCategory}-${item._id}` },
        }}
        asChild
      >
        <TouchableOpacity className="justify-center items-center w-12 h-12 bg-yellow-500 rounded-full">
          <Ionicons name="cart-outline" size={24} color="#121212" />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
};
