import { View, Image, useWindowDimensions, Text } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { DotActiveSwipe, DotSwipe } from "./SwiperDot";

const GameSwiper = ({ pathname }: { pathname: string }) => {
  const { width: w } = useWindowDimensions();

  // console.log(pathname);

  return (
    <View
      className={`relative w-full h-[140px] ${pathname === "/sellkamas" ? "mx-0" : "mx-2"} mt-6`}
    >
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
              width: pathname === "/sellkamas" ? w : w - 16,
              height: 140,
              objectFit: "cover",
            }}
            resizeMode="cover"
            className="rounded-[10px] z-10"
          />
          {pathname !== "/sellkamas" && (
            <View
              style={{
                position: "absolute",
                top: 100,
                bottom: 0,
                left: 0,
                right: 0,
                height: 140,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                zIndex: 20,
              }}
            />
          )}
        </View>
        <View className="relative">
          <Image
            source={require("@/assets/images/iben2.png")}
            style={{
              width: pathname === "/sellkamas" ? w : w - 16,
              height: 140,
              objectFit: "cover",
            }}
            resizeMode="cover"
            className="rounded-[10px] z-10"
          />
          {pathname !== "/sellkamas" && (
            <View
              style={{
                position: "absolute",
                top: 100,
                bottom: 0,
                left: 0,
                right: 0,
                height: 140,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                zIndex: 20,
              }}
            />
          )}
        </View>
      </Swiper>
      {pathname === "/sellkamas" && (
        <View className="absolute inset-0 w-full h-full bg-[#2C2C2C]/60">
          <Text className="rounded w-52 p-2 text-center top-[20%] left-[25%] text-white font-extrabold text-4xl">
            Sell your kamas
          </Text>
        </View>
      )}
    </View>
  );
};

export default GameSwiper;
