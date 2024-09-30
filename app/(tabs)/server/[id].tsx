import {
  View,
  Text,
  Image,
  Dimensions,
  ImageProps,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getServerImg } from "@/lib/utils";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";

import Toast from "react-native-toast-message";
import { ServerP } from "@/types/type";
import { toastConfig } from "@/components/customToast";
import useStore from "@/lib/store";

const ServerPage = () => {
  const { addToCart, carts, totalItems, devise } = useStore();
  const [qty, setQty] = useState<string>("1");
  const w = Dimensions.get("screen").width;
  const { id }: { id: string } = useLocalSearchParams();
  //   console.log(id);
  const tabSplit = id.split("-");
  const serverId = tabSplit[2];
  const serverCat = tabSplit.slice(0, tabSplit.length - 1).join("-");
  // console.log(carts);
  // console.log(totalItems);

  const getSingleServer = (): Promise<ServerP> => {
    const server = fetch(
      `https://services.ibendouma.com/api/server/${serverId}`
    ).then((res) => res.json());
    return server;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["server", serverId],
    queryFn: getSingleServer,
  });

  if (error) {
    Alert.alert("Error", error.message);
  }

  //   console.log(data);

  const returTotalValue = useMemo(() => {
    const serverValue = parseInt(qty, 10);
    if (!serverValue) return data?.serverPrice || 1;
    let actualPriceCur = (data?.serverPrice || 1) / devise.curencyVal;
    let total = (serverValue * actualPriceCur).toFixed(2);
    return Number(total);
  }, [qty, data?.serverPrice]);

  const showToast = () => {
    Toast.show({
      type: "success",
      text2: `${data?.serverName} has been successfully added to your cart.`,
    });
  };

  const handleAddToCart = () => {
    let actualPriceCur = (data?.serverPrice || 1) / devise.curencyVal;
    const cart = {
      productId: data?._id || "",
      category: data?.serverCategory || "",
      server: data?.serverName || "",
      qty: data?.serverMinQty || 1,
      amount: parseInt(qty, 10),
      unitPrice: actualPriceCur,
      totalPrice: returTotalValue,
      image: serverCat,
      type: "dofus",
      currency: devise.currencyName,
      valCurrency: devise.curencyVal,
    };
    addToCart(cart);
    showToast();
  };

  const handleBuyNow = () => {
    const cart = {
      productId: data?._id || "",
      category: data?.serverCategory || "",
      server: data?.serverName || "",
      qty: data?.serverMinQty || 1,
      amount: parseInt(qty, 10),
      unitPrice: data?.serverPrice || 1,
      totalPrice: returTotalValue,
      image: serverCat,
      type: "dofus",
      currency: devise.currencyName,
      valCurrency: devise.curencyVal,
    };
    addToCart(cart);
    router.push("/checkout");
  };

  return (
    <View className="w-full flex-1 bg-primary-500 font-Lato antialiased">
      <View className="relative">
        <Image
          source={getServerImg(serverCat) as ImageProps}
          style={{
            width: w,
            height: 220,
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-7 left-2 rotate-180 p-2 rounded-full bg-black/30 z-20"
        >
          <Icon name="arrow-right-alt" size={42} color="#FFA000" />
        </TouchableOpacity>
        <View className="absolute w-full bg-white opacity-5 top-[0%] h-20"></View>
      </View>
      {isLoading ? (
        <ActivityIndicator className="w-full self-center" />
      ) : (
        <View className="w-full flex-1 bg-primary-400 text-white p-4">
          <ScrollView className="" showsVerticalScrollIndicator={false}>
            <View className="w-full flex-row items-center justify-between bg-primary-300 p-3 rounded-lg">
              <View className="flex-col items-start gap-1">
                <Text className="text-secondary-400 text-xl font-extrabold">
                  Server Category
                </Text>
                <View className="bg-primary-100 rounded-full px-2 py-1.5 text-center mt-2">
                  <Text className="text-secondary-400 text-base font-extrabold capitalize">
                    {serverCat.split("-").join(" ")}
                  </Text>
                </View>
              </View>

              <View className="flex-col items-start gap-1">
                <Text className="text-secondary-400 text-xl font-extrabold">
                  Server Name
                </Text>
                <View className="bg-primary-100 rounded-full px-2 py-1.5 text-center mt-2">
                  <Text className="text-secondary-400 text-base font-extrabold capitalize">
                    {data?.serverName}
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-full flex-row items-center justify-between my-8">
              <View className="flex-col items-start">
                <Text className="text-primary-50 text-xl font-extrabold">
                  Server Price
                </Text>
                <View className="mt-2">
                  <Text className="text-primary-50 font-extrabold text-lg">
                    {data
                      ? (data.serverPrice / devise.curencyVal).toFixed(1)
                      : 1}
                    {devise.currencyName === "euro" && "EUR"}
                    {devise.currencyName === "dollar" && "USD"}
                    {devise.currencyName === "mad" && "MAD"}
                  </Text>
                </View>
              </View>
              <View className="flex-col items-start">
                <Text className="text-primary-50 text-xl font-extrabold">
                  Server Status
                </Text>
                <View
                  className={`rounded-full px-2 py-1.5 mt-2 ${data?.serverStatus === "Disponible" ? "bg-green-100" : "bg-blue-100"}`}
                >
                  <Text
                    className={`font-bold text-white text-base ${data?.serverStatus === "Disponible" ? "text-green-600" : "text-blue-600"}`}
                  >
                    {data?.serverStatus}
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-full flex-col items-center mb-4">
              <View className="relative w-full flex-col items-start p-4">
                <Text className="text-primary-50 text-lg font-extrabold">
                  How many kamas do you need?
                </Text>
                <TextInput
                  className="w-full bg-primary-300 mt-3 text-white/70 text-lg p-4 rounded-lg"
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                  value={qty}
                  onChangeText={setQty}
                />
                <Text className="absolute text-primary-50 text-lg left-[94%] top-[42%] font-extrabold">
                  M
                </Text>
                <View className="w-full flex-row items-center justify-between my-4">
                  <View className="bg-red-50 rounded-full p-1.5">
                    <Text className="text-red-400 text-bs font-extrabold">
                      Note: 1 = 1 million
                    </Text>
                  </View>
                  {returTotalValue && (
                    <View className="flex-row items-center">
                      <Text className="text-primary-50 text-xl font-extrabold">
                        Total:{" "}
                      </Text>
                      <Text className="ml-0.5 text-primary-50 text-xl font-extrabold">
                        {returTotalValue}{" "}
                        {devise.currencyName === "euro" && "EUR"}
                        {devise.currencyName === "dollar" && "USD"}
                        {devise.currencyName === "mad" && "MAD"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {/* <Text className="text-white">{JSON.stringify(data, null, 2)}</Text> */}
          </ScrollView>
          <View className="w-full flex-col items-center bottom-2">
            <TouchableOpacity
              activeOpacity={0.5}
              className={`w-full flex-row items-center justify-center bg-secondary-400 shadow-2xl rounded-full p-4 ${!returTotalValue ? "opacity-50" : ""}`}
              onPress={handleAddToCart}
              disabled={!returTotalValue}
            >
              <Text className="text-primary-200 text-lg font-semibold mr-1">
                Add to cart
              </Text>
              <Icon name="local-mall" size={20} color="#3b3b3b" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              className="w-full flex-row items-center justify-center bg-secondary-400 shadow-2xl rounded-full my-4 p-4"
              disabled={!returTotalValue}
              onPress={handleBuyNow}
            >
              <Text className="text-primary-200 text-lg font-semibold">Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Toast config={toastConfig} />
    </View>
  );
};

export default ServerPage;
