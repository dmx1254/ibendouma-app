import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

export const SellInputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  isQty,
}: InputFieldProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        keyboardType={keyboardType}
        multiline={multiline}
      />
      {isQty && <Text className="absolute text-gray-300 top-10 right-6 text-xl font-bold">M</Text>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD54F",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3B3B3B",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
});
