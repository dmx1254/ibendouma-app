import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import useStore from "@/lib/store";
import { paymentMethods } from "@/lib/utils";

const Checkout = () => {
  const { carts } = useStore();
  const totalOrderAmount = carts.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const [activePayement, setActivePayment] = useState<string>("");
  return (
    <SafeAreaView className="flex-1 bg-primary-500 h-full overflow-y-auto">
      <View className="w-full border-b border-primary-300">
        <View className="w-full flex-row items-center justify-between -mt-4 p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rotate-180"
          >
            <Icon name="arrow-right-alt" size={42} color="#ffb300" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold text-secondary-400">
            Checkout
          </Text>
        </View>
      </View>

      {/* Résumé de la commande */}
      <View className="p-6">
        <Text className="text-xl font-extrabold text-primary-50  mb-4">
          Order Summary
        </Text>
        <View className="bg-primary-400 w-full grid grid-cols-3 p-4 rounded-lg">
          {carts?.map((item, index) => (
            <View
              key={`${item.server}-${index}`}
              className={`flex-row justify-between py-2 ${index < carts?.length - 1 ? "border-b border-primary-100 pb-4" : ""} ${index > 0 ? "pt-2" : ""}`}
            >
              <Text className="text-primary-50 text-base font-bold">
                {item.server}
              </Text>
              <Text className="text-primary-50 text-base font-bold">
                {item.amount} x {item.currency === "usd" && "$"}
                {item.currency === "euro" && "€"}
                {item.currency === "mad" && "dh"}
                {item.unitPrice.toFixed(2)}
              </Text>
              <Text className="text-primary-50 text-base font-bold">
                {item.currency === "usd" && "$"}
                {item.currency === "euro" && "€"}
                {item.currency === "mad" && "dh"}
                {item.totalPrice.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-between mt-4 border-b border-primary-200 pb-4">
          <Text className="font-extrabold text-primary-50 text-lg">Total:</Text>
          <Text className="font-extrabold text-primary-50 text-lg">
            {carts[0]?.currency === "usd" && "$"}
            {carts[0]?.currency === "euro" && "€"}
            {carts[0]?.currency === "mad" && "dh"}
            {totalOrderAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Section des méthodes de paiement */}
      <View className="flex-1 px-6">
        <Text className="text-xl font-extrabold text-primary-50 mb-4">
          Choose a Payment Method
        </Text>
        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`flex-row items-center justify-between border-2 border-transparent rounded-lg p-4 mb-3 ${activePayement === item.slug ? "bg-primary-300" : "bg-primary-400"}`}
              onPress={() => setActivePayment(item.slug)}
            >
              <Text
                className={`font-medium ${activePayement === item.slug ? "text-secondary-400" : "text-primary-50"}`}
              >
                {item.name}
              </Text>
              <Icon
                name={item.icon}
                size={32}
                color={activePayement === item.slug ? "#ffb300" : "#9a9a9a"}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <View className="px-6 py-2 fixed bottom-0 z-50">
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={!activePayement}
          className={`bg-secondary-300 rounded-full p-4 ${!activePayement ? "opacity-50" : ""}`}
        >
          <Text className="text-primary-200 font-bold text-lg text-center">
            Confirm and Pay
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bouton Confirmer */}
    </SafeAreaView>
  );
};

export default Checkout;
