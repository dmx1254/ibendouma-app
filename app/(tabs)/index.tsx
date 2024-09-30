import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dofus from "@/components/Dofus";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  return (
    <GestureHandlerRootView className="flex-1 h-full">
      <SafeAreaView className="flex-1 flex-col items-start bg-primary-500 font-Lato">
        <View className="w-full">
          {/* <Logo /> */}
          <Search />
        </View>
        <Dofus />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
