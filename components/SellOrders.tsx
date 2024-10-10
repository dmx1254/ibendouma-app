import React, { useEffect, useMemo } from "react";
import { FlatList, Image, Text, View, ActivityIndicator } from "react-native";
import { SellOrderItem } from "./SellOrderItem";
import { SellOrder } from "@/types/type";
import useStore from "@/lib/store";
import { resetTime } from "@/lib/utils";

const SellOrders = ({
  orderType,
  activeStatus,
  setSellLength,
  startDate,
  endDate,
}: {
  orderType: string;
  activeStatus: string;
  setSellLength: (selen: number) => void;
  startDate: Date;
  endDate: Date;
}) => {
  const { ordersSells } = useStore();

  // console.log(resetTime(new Date()).getTime(), resetTime(endDate).getTime());
  // console.log(convertedDate(endDate));
  // console.log(convertedDate(new Date()));

  const orderFiltered = useMemo(() => {
    if (!ordersSells) return [];
    const start = resetTime(startDate).getTime();
    const end = resetTime(endDate).getTime();
    const today = resetTime(new Date()).getTime();

    const filteredOrders = ordersSells
      .slice()
      .filter(
        (order: SellOrder) =>
          (order.status === activeStatus || activeStatus === "") &&
          ((resetTime(order.createdAt).getTime() >= start &&
            resetTime(order.createdAt).getTime() <= end) ||
            (start === today && end === today))
      );
    return filteredOrders;
  }, [activeStatus, startDate, endDate]);

  useEffect(() => {
    setSellLength(orderFiltered?.length);
  }, [orderFiltered]);

  return (
    <View className="flex-1">
      {orderFiltered?.length > 0 ? (
        <FlatList
          data={orderFiltered}
          renderItem={({ item }) => <SellOrderItem order={item} />}
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

export default SellOrders;
