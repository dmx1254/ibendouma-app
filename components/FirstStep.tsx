import { View, Text } from "react-native";
import React from "react";
import TextField from "./TextField";
import { UserRegister } from "@/lib/utils";

const FirstStep = ({
  userSignUp,
  setUserSignUp,
}: {
  userSignUp: UserRegister;
  setUserSignUp: (user: UserRegister) => void;
}) => {
  return (
    <View className="w-full">
      <View className="w-full flex-col items-center mb-8">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Last Name
          </Text>
          <TextField
            value={userSignUp.lastname}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, lastname: value })
            }
            placeholder="Lastname"
            keyBoard="default"
          />
        </View>
      </View>
      <View className="w-full flex-col items-center mb-8">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            First Name
          </Text>
          <TextField
            value={userSignUp.firstname}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, firstname: value })
            }
            placeholder="Firstname"
            keyBoard="default"
          />
        </View>
      </View>
      <View className="w-full flex-col items-center mb-8">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Email
          </Text>
          <TextField
            value={userSignUp.email}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, email: value })
            }
            placeholder="Email"
            keyBoard="email-address"
            icon="mail"
          />
        </View>
      </View>
      <View className="w-full flex-col items-center">
        <View className="w-full flex-col items-start">
          <Text className="text-lg font-extrabold text-primary-50 mb-3 pl-4">
            Phone
          </Text>
          <TextField
            value={userSignUp.phone}
            onTextChange={(value) =>
              setUserSignUp({ ...userSignUp, phone: value })
            }
            placeholder="Phone"
            keyBoard="phone-pad"
            icon="call"
          />
        </View>
      </View>
    </View>
  );
};

export default FirstStep;
