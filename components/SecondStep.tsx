import { View, Text } from "react-native";
import React, { useState } from "react";
import TextField from "./TextField";
import { UserRegister } from "@/lib/utils";

const SecondStep = ({
  userSignUp,
  setUserSignUp,
}: {
  userSignUp: UserRegister;
  setUserSignUp: (user: UserRegister) => void;
}) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <View className="w-full">
      <View className="w-full flex-col items-center mb-8">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Address
          </Text>
          <TextField
            value={userSignUp.address}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, address: value })
            }
            placeholder="Your address"
            keyBoard="default"
          />
        </View>
      </View>
      <View className="w-full flex-col items-center mb-8">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Postal Code
          </Text>
          <TextField
            value={userSignUp.postalCode}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, postalCode: value })
            }
            placeholder="Postal Code"
            keyBoard="default"
          />
        </View>
      </View>
      <View className="w-full flex-col items-center mb-8">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Password
          </Text>
          <TextField
            value={userSignUp.password}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, password: value })
            }
            placeholder="Password"
            keyBoard="default"
            icon="lock"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View className="w-full flex-col items-center">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Confirm Password
          </Text>
          <TextField
            value={confirmPassword}
            onTextChange={(value) => setConfirmPassword(value)}
            placeholder="Confirm Password"
            keyBoard="default"
            icon="lock"
            secureTextEntry={true}
          />
        </View>
      </View>
    </View>
  );
};

export default SecondStep;
