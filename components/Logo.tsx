import { View, Text, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View className="flex-row items-center gap-4 mb-4">
      <Image
        source={require("@/assets/images/iben-logo.jpg")}
        resizeMode="cover"
        className="h-16 w-16"
      />
      <Text>Logo</Text>
    </View>
  );
};

export default Logo;
