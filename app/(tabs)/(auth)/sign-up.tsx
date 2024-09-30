import FirstStep from "@/components/FirstStep";
import SecondStep from "@/components/SecondStep";
import StepAction from "@/components/StepAction";
import TextField from "@/components/TextField";
import { UserRegister } from "@/lib/utils";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialIcons";

const SignUp = () => {
  const user = {
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    postalCode: "",
  };
  const [userSignUp, setUserSignUp] = useState<UserRegister>(user);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  const [isActiveStep, setIsActiveStep] = useState<number>(0);

  const handleSetStep = () => {
    setIsActiveStep((prevActiveStep: number) =>
      prevActiveStep === 0 ? prevActiveStep + 1 : 0
    );
  };

  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center bg-primary-500 p-8">
      <View className="flex flex-col relative w-full mb-4 h-3 bg-primary-300 rounded-full">
        <View
          style={{
            width: `${(isActiveStep + 1) * 50}%`,
          }}
          className={`absolute h-3 bg-secondary-300 z-10 transition-shadow duration-500 ease-in-out rounded-full`}
        />
        <View className="absolute z-20 top-[-90%] left-[-2%] bg-secondary-500 rounded-full p-0">
          <Icon name="account-circle" size={35} color="#1F1F1F" />
        </View>
        <View
          className={`absolute z-20 top-[-90%] left-[90%] rounded-full p-0 ${isActiveStep === 1 ? "bg-secondary-500" : "bg-primary-200"}`}
        >
          <Icon name="my-location" size={35} color="#1F1F1F" />
        </View>
      </View>
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl self-start font-extrabold">
          Personal info
        </Text>

        <Text
          className={`text-xl self-end font-extrabold ${isActiveStep === 1 ? "text-white" : "text-primary-50"}`}
        >
          Location info
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 w-full items-center justify-center"
      >
        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{
            paddingTop: 40,
          }}
        >
          <View className="w-full flex items-center justify-center">
            {isActiveStep === 0 && (
              <FirstStep
                userSignUp={userSignUp}
                setUserSignUp={setUserSignUp}
              />
            )}
            {isActiveStep === 1 && (
              <SecondStep
                userSignUp={userSignUp}
                setUserSignUp={setUserSignUp}
              />
            )}
          </View>
        </ScrollView>
        {isActiveStep === 0 && (
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity
              activeOpacity={0.5}
              className="flex-row items-center gap-1 mb-6"
            >
              <Text className="text-primary-50 text-xl">
                Already have an account?
              </Text>
              <Text className="text-secondary-300 text-xl underline">
                Sign in
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      </KeyboardAvoidingView>
      <StepAction
        userSignUp={userSignUp}
        isActiveStep={isActiveStep}
        handleSetStep={handleSetStep}
      />
    </SafeAreaView>
  );
};

export default SignUp;
