import React, { useState } from "react";
import TextField from "@/components/TextField";
import { USERSIGNIN } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { saveToken } from "@/lib/utils";
import useStore from "@/lib/store";

const SignIn = () => {
  const { addUserAfterLogin } = useStore();
  const [user, setUser] = useState<USERSIGNIN>({ email: "", password: "" });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  //   console.log(user);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const result = await axios.post(
          `${process.env.EXPO_PUBLIC_IBENDOUMA_CLIENT_URL}/users/login`,
          user
        );
        if (result.data) {
          await saveToken("token", result.data.token);
          await addUserAfterLogin(result.data.person);
          router.replace("/profile");
          // console.log(result.data);
        }
        return result;
      } catch (error: any) {
        const errMess: string = error?.response?.data?.message;
        if (errMess.includes("email")) {
          setError((prevErrMess) => ({ ...prevErrMess, emailError: errMess }));
        } else if (errMess.includes("passe")) {
          setError((prevErrMess) => ({
            ...prevErrMess,
            passwordError: errMess,
          }));
        } else {
          setError({ emailError: "", passwordError: "" });
        }
      }
    },
  });

  // console.log(mutation.data);

  // if (mutation.isSuccess) {

  //   const { data } = mutation.data;
  //   console.log(data);
  //   await saveToken("token", data.token);
  // }

  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center bg-primary-500 p-8">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 w-full items-center justify-center"
      >
        <View className="w-full flex-col items-center justify-center">
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
              keyBoard="email-address"
              placeholder="Email"
              icon="mail"
            />
            {error.emailError && (
              <Text
                className="text-base text-red-300 w-full px-4 pt-2"
                numberOfLines={2}
              >
                {error.emailError}
              </Text>
            )}
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
            {error.passwordError && (
              <Text
                className="text-base text-red-300 w-full px-4 pt-2"
                numberOfLines={2}
              >
                {error.passwordError}
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            className={`flex-row items-center justify-center bg-secondary-300 mt-10 w-full p-4 rounded-full ${!user.email || !user.password ? "opacity-70" : ""}`}
            onPress={() => mutation.mutate()}
            disabled={!user.email || !user.password}
          >
            <Text className="text-primary-200 text-center text-xl font-bold">
              {mutation.isPending ? "Is SignIn..." : "Sign In"}
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
