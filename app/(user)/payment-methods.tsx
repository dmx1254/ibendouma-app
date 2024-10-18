import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const paymentMethod = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-500">
      <Text className="text-white text-2xl">payment methods</Text>
    </SafeAreaView>
  );
};

export default paymentMethod;
