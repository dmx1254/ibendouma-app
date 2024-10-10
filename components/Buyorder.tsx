import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Image, Text, View, ActivityIndicator } from "react-native";
import { SellOrderItem } from "./SellOrderItem";
import { OrderItem } from "./OrderItem";
import { Order } from "@/types/type";
import useStore from "@/lib/store";
import { resetTime } from "@/lib/utils";

const Buyorder = ({
  orderType,
  activeStatus,
  setBuyLength,
  startDate,
  endDate,
}: {
  orderType: string;
  activeStatus: string;
  setBuyLength: (buyL: number) => void;
  startDate: Date;
  endDate: Date;
}) => {
  const { ordersBuys } = useStore();

  const orderFiltered = useMemo(() => {
    if (!ordersBuys) return [];
    const start = resetTime(startDate).getTime();
    const end = resetTime(endDate).getTime();
    const today = resetTime(new Date()).getTime();

    const filtereOrder = ordersBuys
      .slice()
      .filter(
        (order: Order) =>
          (order.status === activeStatus || activeStatus === "") &&
          ((resetTime(order.createdAt).getTime() >= start &&
            resetTime(order.createdAt).getTime() <= end) ||
            (start === today && end === today))
      );
    return filtereOrder;
  }, [activeStatus, startDate, endDate]);

  useEffect(() => {
    setBuyLength(orderFiltered?.length);
  }, [orderFiltered]);

  return (
    <View className="flex-1">
      {orderFiltered?.length > 0 ? (
        <FlatList
          data={orderFiltered}
          renderItem={({ item }) => <OrderItem order={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center mb-20 p-8">
          <Text className="text-white text-center text-2xl font-semibold">
            Oup's 😕, No {orderType.split("-").join(" ")} orders found! 🔍
          </Text>
        </View>
      )}
    </View>
  );
};

export default Buyorder;
