import React from "react";
import useStore from "@/lib/store";
import { getServerImg } from "@/lib/utils";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const Cart = () => {
  const { carts, totalItems, devise, removeFromCart, updateToCart, clearCart } =
    useStore();
  const totalPrice = carts.reduce((sum, item) => sum + item.totalPrice, 0);

  //   console.log(carts);

  return (
    <SafeAreaView className="w-full flex-1 bg-primary-500">
      {/* Header */}
      <View className="w-full border-b border-primary-300">
        <View className="w-full flex-row items-center justify-between -mt-4 p-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rotate-180"
          >
            <Icon name="arrow-right-alt" size={42} color="#ffb300" />
          </TouchableOpacity>
          <Text className="text-xl font-extrabold text-secondary-400">
            My Cart ({totalItems})
          </Text>
        </View>
      </View>

      {/* Empty Cart */}
      {totalItems === 0 ? (
        <View className="flex flex-col items-center justify-center flex-1 p-4">
          <Image
            source={require("@/assets/images/empty-cart.png")}
            className="w-64 h-64"
            style={{ resizeMode: "contain" }}
          />
          <Text className="text-center text-secondary-100 text-lg mt-4">
            Your cart is empty.
          </Text>
          <Text className="text-center text-secondary-100 text-base mt-2">
            Looks like you haven't added anything yet!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="bg-secondary-500 mt-8 py-3 px-6 rounded-full"
          >
            <Text className="text-center text-white font-extrabold text-lg">
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ marginTop: 20, paddingBottom: 20 }}
          className="p-4"
        >
          {/* Cart Items */}
          {carts.map((item) => (
            <View
              key={item.productId}
              className="flex flex-row items-center justify-between bg-primary-400 rounded-lg p-4 mb-4"
            >
              <Image
                source={getServerImg(item.image) as ImageProps}
                className="w-16 h-16 rounded-md"
                style={{ resizeMode: "cover" }}
              />
              <View className="flex-1 ml-4">
                <Text className="text-primary-50 font-bold text-lg">
                  {item.server}
                </Text>
                <Text className="text-secondary-200">
                  {item.amount} x {item.unitPrice.toFixed(2)} {item.currency}
                </Text>
                <Text className="text-secondary-300 font-extrabold">
                  {item.totalPrice.toFixed(2)} {item.currency}
                </Text>

                {/* Quantity Adjuster */}
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="bg-secondary-500 px-3 py-1 rounded-l-full"
                    onPress={() =>
                      updateToCart(item.productId, Math.max(item.amount - 1, 1))
                    }
                  >
                    <Text className="text-white text-lg">−</Text>
                  </TouchableOpacity>
                  <Text className="mx-2 text-primary-50 font-bold text-lg">
                    {item.amount}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="bg-secondary-500 px-3 py-1 rounded-r-full"
                    onPress={() =>
                      updateToCart(item.productId, item.amount + 1)
                    }
                  >
                    <Text className="text-white text-lg">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                activeOpacity={0.5}
                className="bg-red-600 px-3 py-2 rounded-full"
                onPress={() => removeFromCart(item.productId)}
              >
                <Text className="text-primary-50 font-semibold">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

        </ScrollView>
      )}
      {/* Proceed to Checkout */}

      {totalItems > 0 && (
        <View className="bg-primary-400">
          <View className="w-full flex-row items-center justify-between p-4">
            <View className="">
              <Text className="text-primary-50 font-extrabold text-xl">Total:</Text>
              <Text className="text-secondary-300 font-extrabold text-2xl">
                {totalPrice.toFixed(2)} {devise.currencyName}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              className="self-end bg-red-500 mt-4 py-3 rounded-full w-40"
              onPress={() => clearCart()}
            >
              <Text className="text-center text-primary-50 font-semibold text-lg">
                Clear Cart
              </Text>
            </TouchableOpacity>
          </View>
          <Link href="/(tabs)/checkout" asChild className="mt-2">
            <TouchableOpacity className="bg-secondary-400 mt-4 py-3 rounded-full">
              <Text className="text-center text-primary-200 font-semibold text-lg">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
