import { sellPaymentMethods } from "@/lib/utils";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Modal } from "react-native";

export const PaymentModal = ({
  openModal,
  onClose,
  paymentMethod,
  handlePaymentMethods,
}: {
  openModal: boolean;
  onClose: () => void;
  paymentMethod: string;
  handlePaymentMethods: (method: string) => void;
}) => {
  return (
    <Modal visible={openModal} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 w-full z-50 bg-black/20 bg-opacity-50 items-center justify-center bottom-0 left-0 right-0 top-1/2">
          <TouchableWithoutFeedback>
            <View className="h-full bg-primary-300 w-full items-center justify-center pb-20">
                <View className="bg-secondary-400 rounded h-1 w-20 self-center mt-1"></View>
              <FlatList
                data={sellPaymentMethods}
                contentContainerStyle={{
                  paddingTop: 10,
                  paddingBottom: 40,
                }}
                keyExtractor={(item) => item}
                className="w-full"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`w-full p-3 rounded ${paymentMethod === item ? "bg-secondary-400" : ""} `}
                    onPress={() => handlePaymentMethods(item)}
                  >
                    <Text
                      className={`text-lg font-bold text-center text-gray-300 ${paymentMethod === item ? "text-primary-200" : ""}`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
