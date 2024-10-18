import useStore from "@/lib/store";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CurrencyModal from "./CurrencyModal";
import { Link, router } from "expo-router";

const Search = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { totalItems } = useStore();

  const handleVisible = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <View className="pb-2 border-b border-primary-100">
      <View className="flex-row items-center justify-center p-4">
        <View className="relative flex-1 flex-row items-center w-full">
          <TextInput
            className="flex-1 bg-primary-100 text-primary-50 text-sm pl-11 pt-3 pr3 pb-3 rounded-[10px]"
            placeholder="Search what you want"
            keyboardType="default"
          />
          <View className="absolute top-[20%] left-[3%]">
            <Icon name="search" size={30} color="#71717a" />
          </View>
        </View>
        <View className="flex-row gap-2 ml-4 select-none">
          <Link href="/(tabs)/cart" asChild>
            <TouchableOpacity
              activeOpacity={0.5}
              className="relative flex items-center justify-center select-none"
            >
              <Icon name="local-mall" size={30} color="#9ca3af" />
              {totalItems > 0 && (
                <TextInput
                  style={{
                    userSelect: "none",
                  }}
                  className="absolute h-5 w-5 flex items-center justify-center rounded-full bg-secondary-500 top-[-10%] left-[60%] text-white text-xs text-center select-none"
                >
                  {totalItems}
                </TextInput>
              )}
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            activeOpacity={0.5}
            className="realtive flex items-center justify-center"
          >
            <Icon name="notifications" size={36} color="#9ca3af" />
            <TextInput className="absolute h-2.5 w-2.5 flex items-center justify-center rounded-full bg-secondary-500 top-[6%] left-[60%]"></TextInput>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            className="flex items-center justify-center"
            onPress={handleVisible}
          >
            <Icon name="language" size={32} color="#9ca3af" />
          </TouchableOpacity>
          <CurrencyModal visible={visible} onClose={onClose} />
        </View>
      </View>
    </View>
  );
};

export default Search;
