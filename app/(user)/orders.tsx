import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import OrderFilterModal from "@/components/OrderFilterModal";
import SellOrders from "@/components/SellOrders";
import Buyorder from "@/components/Buyorder";

const UserOrders = () => {
  const [orderType, setOrderType] = useState("buy-orders");
  const [visible, setVisible] = useState<boolean>(false);
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [buyLength, setBuyLength] = useState<number | null>(null);
  const [sellLength, setSellLength] = useState<number | null>(null);

  //   visible
  const onClose = () => {
    setVisible(false);
  };

  const handleOrderType = (typeOrder: string) => {
    setActiveStatus("");
    setStartDate(new Date());
    setEndDate(new Date());
    setOrderType(typeOrder);
  };

  return (
    <View className="flex-1 bg-primary-500">
      <StatusBar hidden={false} />
      <LinearGradient
        colors={["#FFA000", "#FF6B00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="relative w-full h-44 rounded-b-3xl overflow-hidden"
      >
        <View className="w-full flex-col items-start gap-2 justify-between p-4 mt-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-primary-300 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#FFA000" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">My Orders</Text>
          <Text className="text-white text-xl font-bold">
            {orderType === "buy-orders"
              ? (buyLength ?? 0)
              : orderType === "sell-orders"
                ? (sellLength ?? 0)
                : "0"}{" "}
            items
          </Text>
        </View>
        <View className="absolute z-20 top-12 right-4">
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex items-center justify-center text-center bg-primary-300 rounded-full p-2"
            onPress={() => setVisible(true)}
          >
            <Icon name="filter-list" size={24} color="#FFA000" />
          </TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </LinearGradient>
      <OrderFilterModal
        visible={visible}
        onClose={onClose}
        filterType={orderType}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <View className="flex-row justify-center my-8">
        <TouchableOpacity
          onPress={() => handleOrderType("buy-orders")}
          className={`px-6 py-2 rounded-l-full ${orderType === "buy-orders" ? "bg-secondary-500" : "bg-primary-400"}`}
        >
          <Text
            className={`${orderType === "buy-orders" ? "text-primary-500" : "text-white"} font-bold`}
          >
            Buy Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOrderType("sell-orders")}
          className={`px-6 py-2 rounded-r-full ${orderType === "sell-orders" ? "bg-secondary-500" : "bg-primary-400"}`}
        >
          <Text
            className={`${orderType === "sell-orders" ? "text-primary-500" : "text-white"} font-bold`}
          >
            Sell Orders
          </Text>
        </TouchableOpacity>
      </View>
      {orderType === "buy-orders" && (
        <Buyorder
          orderType={orderType}
          activeStatus={activeStatus}
          setBuyLength={setBuyLength}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      {orderType === "sell-orders" && (
        <SellOrders
          orderType={orderType}
          activeStatus={activeStatus}
          setSellLength={setSellLength}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </View>
  );
};

export default UserOrders;
