import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "@/lib/store";
import { Dimensions } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import * as SecureStore from "expo-secure-store";

// import Icon from "react-native-vector-icons/MaterialIcons";

const Profile = () => {
  // const { width } = Dimensions.get("screen");
  const { user, removeUser } = useStore();

  useEffect(() => {
    if (!user) router.replace("/(auth)/sign-in");
  }, [user]);

  const profileOptions = [
    { icon: "cart-outline", title: "My Orders", value: "5 orders" },
    { icon: "heart-outline", title: "My Wishlist", value: "12 items" },
    { icon: "wallet-outline", title: "Payment Methods", value: "2 cards" },
    {
      icon: "location-outline",
      title: "Delivery Addresses",
      value: "3 addresses",
    },
    { icon: "settings-outline", title: "Account Settings", value: "" },
    { icon: "help-circle-outline", title: "Help & Support", value: "" },
  ];

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    removeUser();
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-primary-500">
      <StatusBar hidden />
      <ScrollView className="flex-1">
        <View className="relative">
          <Image
            source={require("@/assets/images/iben1.png")}
            className="w-full h-40 opacity-50"
          />
          <View className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 bg-primary-300 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#FFA000" />
          </TouchableOpacity>
        </View>

        <View className="px-6 -mt-16">
          <View className="flex-row items-end">
            <Image
              source={
                user?.profil
                  ? { uri: user.profil }
                  : require("@/assets/images/user.png")
              }
              className="w-28 h-28 rounded-full border-4 border-gray-800"
            />
            <View className="ml-4 mb-2">
              <Text className="text-white text-2xl font-bold">{`${user?.firstname} ${user?.lastname}`}</Text>
              <Text className="text-gray-400 text-sm">{user?.email}</Text>
            </View>
          </View>

          <View className="flex-row justify-between bg-primary-200 mt-6 rounded-lg p-4">
            <View className="items-center">
              <Text className="text-white text-lg font-bold">250</Text>
              <Text className="text-gray-400 text-xs">Kamas</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-lg font-bold">15</Text>
              <Text className="text-gray-400 text-xs">Characters</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-lg font-bold">3</Text>
              <Text className="text-gray-400 text-xs">Servers</Text>
            </View>
          </View>

          <View className="mt-6">
            {profileOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-between py-4 border-b border-gray-800"
                onPress={() => console.log(option.title)}
              >
                <View className="flex-row items-center">
                  <Ionicons name={option.icon} size={26} color="#FFA000" />
                  <Text className="text-white text-lg ml-4">
                    {option.title}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  {option.value && (
                    <Text className="text-gray-400 mr-2">{option.value}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={20} color="#FFA000" />
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="flex-row items-center justify-between py-4"
              onPress={handleLogout}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="logout" size={26} color="#FFA000" />
                <Text className="text-white text-lg ml-4">Logout</Text>
              </View>
              <View className="flex-row items-center">
                {/* {option.value && (
                    <Text className="text-gray-400 mr-2">{option.value}</Text>
                  )} */}
                <Ionicons name="chevron-forward" size={20} color="#FFA000" />
              </View>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            className="mt-6 bg-red-600 rounded-lg py-3 items-center"
            onPress={() => console.log("Logout")}
          >
            <Text className="text-white text-lg font-bold">Logout</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
