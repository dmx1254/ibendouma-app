import { Text, View } from "react-native";
import { SellOrder } from "@/types/type";
import { convertedDate } from "@/lib/utils";
import { CompPayMethodParse } from "./CompPayMethodParse";

export const SellOrderItem = ({ order }: { order: SellOrder }) => {
  // console.log(order);
  return (
    <View className="bg-primary-400 rounded-lg p-4 mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white font-bold">Order #{order.numBuy}</Text>
        <View className="p-2 rounded-full bg-primary-200">
          <Text
            className={
              order.status === "Payée"
                ? "text-green-600"
                : order.status === "En attente"
                  ? "text-yellow-600"
                  : order.status === "Annulée"
                    ? "text-red-600"
                    : order.status === "En Cours de payment"
                      ? "text-blue-600"
                      : ""
            }
          >
            {order.status}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-400">
          Date: {convertedDate(order.createdAt)}
        </Text>
        <CompPayMethodParse
          bankPayment={order.paymentInfoDetails || "No payment methods"}
        />
      </View>

      <View className="mt-2 border-t border-primary-300 pt-2">
        <Text className="text-white">
          {order.jeu} - {order.server}
        </Text>
        <Text className="text-gray-400">
          Quantity: <Text className="font-bold">{order.qte}M</Text> kamas
        </Text>
        <Text className="text-gray-400">
          U. Price:{" "}
          {order.currencymethod === "euro"
            ? "€ "
            : order.currencymethod === "dollar"
              ? "$ "
              : order.currencymethod === "mad"
                ? "dh"
                : "DH "}
          {order.pu}
        </Text>
        <Text className="text-yellow-500 font-bold mt-1">
          Total:{" "}
          {order.currencymethod === "euro"
            ? "€ "
            : order.currencymethod === "dollar"
              ? "$ "
              : order.currencymethod === "mad"
                ? "dh"
                : "DH "}
          {order.totalPrice}
        </Text>
      </View>
    </View>
  );
};
