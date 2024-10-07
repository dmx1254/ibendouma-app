import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dofus from "@/components/Dofus";
import Search from "@/components/Search";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GameSwiper from "@/components/GameSwiper";

const Home = () => {
  // const token = useCheckToken();
  // console.log("user Token: " + JSON.parse(JSON.stringify(token)));

  return (
    <GestureHandlerRootView className="flex-1 h-full">
      <SafeAreaView className="flex-1 flex-col items-start bg-primary-500 font-Lato">
        <View className="w-full">
          {/* <Logo /> */}
          <Search />
        </View>
        <GameSwiper />
        <Dofus />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
