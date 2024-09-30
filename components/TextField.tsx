import React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
interface INPUTFIELD {
  secureTextEntry?: boolean;
  value: string;
  onTextChange: (val: string) => void;
  placeholder?: string;
  keyBoard: string;
  icon?: string;
}

const TextField: React.FC<INPUTFIELD> = ({
  secureTextEntry,
  value,
  onTextChange,
  placeholder,
  keyBoard,
  icon,
}) => {
  return (
    <View className="w-full relative">
      <TextInput
        secureTextEntry={secureTextEntry}
        value={value}
        placeholder={placeholder}
        onChangeText={(userText) => onTextChange(userText)}
        className={`w-full text-lg bg-primary-300 text-primary-50 py-4 pr-4 ${icon ? "pl-14" : "pl-4"} rounded-full`}
        textAlign="left"
        keyboardType={keyBoard ? keyBoard : "default"}
      />
      {icon && (
        <View className="absolute top-[26%] left-[5%]">
          <Icon name={icon} size={30} color="#9a9a9a" />
        </View>
      )}
    </View>
  );
};

export default TextField;
