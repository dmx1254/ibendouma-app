import { Text, View } from "react-native";
import { Order } from "@/types/type";
import { convertedDate } from "@/lib/utils";

export const OrderItem = ({ order }: { order: Order }) => (
  <View className="bg-primary-400 rounded-lg p-4 mb-4">
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-white font-bold">Order #{order.orderNum}</Text>
      <View className="p-2 rounded-full bg-primary-200">
        <Text
          className={
            order.status === "Terminée"
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
      <Text className="text-gray-400">{order.paymentMethod}</Text>
    </View>
    {order?.products?.map((product, index) => (
      <View key={index} className="mt-2 border-t border-primary-300 pt-2">
        <Text className="text-white">
          {product.category} - {product.server}
        </Text>
        <Text className="text-gray-400">
          Quantity:{" "}
          <Text className="font-bold">{product.amount.toLocaleString()}M</Text>{" "}
          kamas
        </Text>
        <Text className="text-gray-400">Character: {product.character}</Text>
        <Text className="text-secondary-500 font-bold mt-1">
          Total:{" "}
          {order.cur === "euro"
            ? "€ "
            : order.cur === "dollar"
              ? "$ "
              : order.cur === "mad"
                ? "dh"
                : "DH "}
          {order.totalPrice}
        </Text>
      </View>
    ))}
  </View>
);
