import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import useStore from "@/lib/store";
import { WishlistItem } from "@/components/WishlistItem";

const Wishlist = () => {
  const { wishlist } = useStore();
  return (
    <View className="flex-1 bg-primary-500">
      <StatusBar hidden={false} />
      <LinearGradient
        colors={["#FFA000", "#FF6B00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full h-44 rounded-b-3xl overflow-hidden"
      >
        <View className="flex-1 justify-end pt-8 pb-4 px-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-10 left-4 bg-white/20 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold mt-1.5">
            My Wishlist
          </Text>
          <Text className="text-white text-lg opacity-80 mt-1.5">
            {wishlist.length} items saved
          </Text>
        </View>
      </LinearGradient>

      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={({ item }) => <WishlistItem item={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="heart-outline" size={100} color="#FFA000" />
          <Text className="text-white text-2xl font-bold mt-6 text-center">
            Your wishlist is waiting to be filled
          </Text>
          <Text className="text-gray-400 text-lg mt-2 text-center">
            Add items to your wishlist and make your Dofus dreams come true!
          </Text>
          <TouchableOpacity
            className="mt-8 bg-yellow-500 rounded-full px-8 py-4"
            onPress={() => router.push("/")}
          >
            <Text className="text-primary-500 font-bold text-lg">
              Explore Treasures
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Wishlist;
