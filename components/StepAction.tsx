import { UserRegister } from "@/lib/utils";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const StepAction = ({
  userSignUp,
  isActiveStep,
  handleSetStep,
}: {
  userSignUp: UserRegister;
  isActiveStep: number;
  handleSetStep: () => void;
}) => {
  const handleRegister = () => {
    console.log(userSignUp);
  };

  return (
    <View className="w-full p-4">
      {isActiveStep === 0 && (
        <View className="w-full flex items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full max-w-xs flex items-center justify-center mx-auto bg-yellow-400 p-4 rounded-full shadow-lg"
            onPress={handleSetStep}
          >
            <Text className="text-primary-200 text-lg font-bold text-center">
              Next Step
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isActiveStep === 1 && (
        <View className="w-full flex-row justify-between items-center">
          {/* Previous Button */}
          <TouchableOpacity
            className="flex-row w-36 items-center bg-gray-200 p-4 rounded-full shadow-md"
            onPress={handleSetStep}
          >
            <Icon name="arrow-back" size={24} color="#3b3b3b" />
            <Text className="text-primary-200 ml-2 text-lg font-bold">
              Previous
            </Text>
          </TouchableOpacity>

          {/* Confirm Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row w-36 items-center justify-center bg-secondary-300 p-4 rounded-full shadow-md"
            onPress={handleRegister}
          >
            <Text className="text-primary-200 text-lg font-bold text-center">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default StepAction;
