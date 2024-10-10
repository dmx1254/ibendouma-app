import { useState } from "react";
import { View, Text } from "react-native";

export const CompPayMethodParse: React.FC<{ bankPayment: string }> = ({
  bankPayment,
}) => {
  return (
    <View className="flex flex-col items-start gap-1">
      <Text className="text-gray-400">
        {bankPayment === "No payment methods"
          ? ""
          : bankPayment.split("<br/>")[0]}
      </Text>
    </View>
  );
};
