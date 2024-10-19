import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/lib/store";
import {
  PAYMENTMETHOD,
  orderBuyNumGenerated,
  paymentMethods,
} from "@/lib/utils";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Cart } from "@/types/type";
import { ImageProps } from "react-native";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/customToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Checkout = () => {
  const { carts, user } = useStore();
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  // console.log(carts);
  const totalOrderAmount = carts.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
  const [activePayment, setActivePayment] = useState<string>("");

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "dollar":
        return "$";
      case "euro":
        return "€";
      case "mad":
        return "dh";
      default:
        return "";
    }
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "Your order buy added successfully",
    });
  };

  const handleAddOrder = () => {
    const products = carts.map((cart) => {
      return {
        productId: cart.productId,
        category: cart.category,
        server: cart.server,
        qty: cart.qty,
        amount: cart.amount,
        price: cart.unitPrice.toFixed(2),
        character: cart.character,
        totalPrice: cart.totalPrice,
      };
    });
    let totalPrice = carts.reduce((acc, item) => acc + item.totalPrice, 0);

    const order = {
      userId: user?._id,
      orderNum: orderBuyNumGenerated(),
      products: products,
      address: user?.address,
      status: "En attente",
      totalPrice: totalPrice,
      paymentMethod: activePayment,
      orderIdPaid: "",
      cur: carts[0]?.currency,
      valCurency: carts[0]?.valCurrency,
    };
    if (user) {
      return order;
    }
  };
  const mutation = useMutation({
    mutationFn: async () => {
      const order = handleAddOrder();
      try {
        setPaymentLoading(true);
        const result = await axios.post(
          `${process.env.EXPO_PUBLIC_IBENDOUMA_CLIENT_URL}/order`,
          order
        );
        if (result.data) {
          showToast();
        }
      } catch ({ response }: any) {
        console.log(response);
      } finally {
        setPaymentLoading(false);
      }
    },
  });

  const renderOrderItem = ({ item, index }: { item: Cart; index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100).duration(400)}
      style={styles.orderItemContainer}
    >
      <LinearGradient
        colors={["#2C2C2C", "#1F1F1F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orderItem}
      >
        <View style={styles.serverInfo}>
          <Text style={styles.serverName}>{item.server}</Text>
          <Text style={styles.amount}>
            {item.amount} x {getCurrencySymbol(item.currency)}
            {item.unitPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            {getCurrencySymbol(item.currency)}
            {item.totalPrice.toFixed(2)}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderPaymentMethod = ({
    item,
    index,
  }: {
    item: PAYMENTMETHOD;
    index: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <TouchableOpacity
        style={[
          styles.paymentMethod,
          activePayment === item.slug && styles.activePaymentMethod,
        ]}
        onPress={() => setActivePayment(item.slug)}
      >
        <Image
          resizeMode="contain"
          source={item.image as ImageProps}
          style={styles.paymentIcon}
        />
        <Text
          style={[
            styles.paymentText,
            activePayment === item.slug && styles.activePaymentText,
          ]}
        >
          {item.name}
        </Text>
        {activePayment === item.slug && (
          <Ionicons name="checkmark-circle" size={24} color="#FFB300" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1F1F1F", "#121212"]} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#FFB300" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        <Animated.View
          entering={FadeInDown.duration(400)}
          style={styles.orderSummary}
        >
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderList}>
            <FlatList
              data={carts}
              renderItem={renderOrderItem}
              keyExtractor={(item, index) => `${item.server}-${index}`}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>
              {getCurrencySymbol(carts[0]?.currency)}
              {totalOrderAmount.toFixed(2)}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Choose a Payment Method</Text>
          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentMethod}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.paymentList}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !activePayment && styles.disabledButton,
          ]}
          disabled={!activePayment || !user}
          onPress={() => mutation.mutate()}
        >
          <Text style={styles.confirmButtonText}>
            {paymentLoading ? "Is processing..." : "Confirm and Pay"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFB300",
  },
  orderSummary: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  orderList: {
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
  },
  orderItemText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFB300",
  },
  paymentSection: {
    flex: 1,
    padding: 20,
  },
  paymentList: {
    paddingBottom: 20,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  activePaymentMethod: {
    backgroundColor: "#2C2C2C",
    borderColor: "#FFB300",
    borderWidth: 1,
  },
  paymentIcon: {
    width: 150,
    height: 40,
    marginRight: 15,
    borderRadius: 10,
  },
  paymentText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  activePaymentText: {
    color: "#FFB300",
  },
  confirmButton: {
    backgroundColor: "#FFB300",
    borderRadius: 25,
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  orderItemContainer: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  orderItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serverInfo: {
    flex: 1,
  },
  serverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceLabel: {
    fontSize: 12,
    color: "#B0B0B0",
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFB300",
  },
});

export default Checkout;
