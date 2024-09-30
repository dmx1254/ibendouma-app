import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

const Profile = () => {
  const user = false;
  useEffect(() => {
    if (!user) router.replace("/(auth)/sign-in");
  }, []);

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
