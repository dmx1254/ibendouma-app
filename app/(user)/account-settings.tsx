import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountSetting = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-500">
      <Text className="text-white text-2xl">account settings</Text>
    </SafeAreaView>
  );
};

export default AccountSetting;
