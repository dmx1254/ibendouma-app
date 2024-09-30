import React, { useState } from "react";
import TextField from "@/components/TextField";
import { USERSIGNIN } from "@/types/type";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Image } from "react-native";

const SignIn = () => {
  const [user, setUser] = useState<USERSIGNIN>({ email: "", password: "" });
  //   console.log(user);
  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center bg-primary-500 p-8">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 w-full items-center justify-center"
      >
        <View className="w-full flex-col items-center">
          <View className="text-2xl flex-col items-center mb-10">
            <Text className="text-5xl text-white font-extrabold uppercase">
              Welcome!
            </Text>
          </View>
          <View className="w-full flex-col items-start mb-8">
            <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
              Email
            </Text>
            <TextField
              value={user.email}
              onTextChange={(value) => setUser({ ...user, email: value })}
              keyBoard="email"
              placeholder="Email"
              icon="mail"
            />
          </View>
          <View className="w-full flex-col items-start">
            <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
              Password
            </Text>
            <TextField
              value={user.password}
              keyBoard="default"
              onTextChange={(value) => setUser({ ...user, password: value })}
              secureTextEntry={true}
              placeholder="Password"
              icon="lock"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            className="bg-secondary-300 mt-10 w-full p-4 rounded-full"
          >
            <Text className="text-primary-200 text-center text-xl font-bold">
              Sign In
            </Text>
          </TouchableOpacity>

          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity
              activeOpacity={0.5}
              className="flex-row items-center gap-1 mt-3"
            >
              <Text className="text-primary-50 text-xl">
                Don't have an account?
              </Text>
              <Text className="text-secondary-300 text-xl underline">
                Sign up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
