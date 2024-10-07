import {
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { DotActiveSwipe, DotSwipe } from "./SwiperDot";

const GameSwiper = () => {
  const { width: w } = useWindowDimensions();

  return (
    <View className="w-full h-[140px] mx-2 mt-6">
      <Swiper
        dot={<DotSwipe />}
        activeDot={<DotActiveSwipe />}
        horizontal
        autoplayTimeout={3.5}
        loop
        showsButtons={false}
        autoplay
        removeClippedSubviews={false}
      >
        <View className="relative">
          <Image
            source={require("@/assets/images/iben1.png")}
            style={{
              width: w - 16,
              height: 140,
              objectFit: "cover",
            }}
            resizeMode="cover"
            className="rounded-[10px] z-10"
          />
          <View
            style={{
              position: "absolute",
              top: 100,
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              zIndex: 20,
            }}
          />
        </View>
        <View className="relative">
          <Image
            source={require("@/assets/images/iben2.png")}
            style={{
              width: w - 16,
              height: 140,
              objectFit: "cover",
            }}
            resizeMode="cover"
            className="rounded-[10px] z-10"
          />
          <View
            style={{
              position: "absolute",
              top: 100,
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              zIndex: 20,
            }}
          />
        </View>
      </Swiper>
    </View>
  );
};

export default GameSwiper;
