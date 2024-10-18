import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  ViewStyle,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { ServerP } from "@/types/type";
import useStore from "@/lib/store";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/customToast";

const ServerPage = () => {
  const { addToCart, devise, addToWishList, user, wishlist, removeFromWish } =
    useStore();
  const [qty, setQty] = useState<string>("1");
  const { id }: { id: string } = useLocalSearchParams();
  const tabSplit = id.split("-");
  const serverId = tabSplit[2];
  const serverCat = tabSplit.slice(0, tabSplit.length - 1).join("-");

  const getSingleServer = (): Promise<ServerP> => {
    return fetch(
      `${process.env.EXPO_PUBLIC_IBENDOUMA_CLIENT_URL}/server/${serverId}`
    ).then((res) => res.json());
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["server", serverId],
    queryFn: getSingleServer,
  });

  if (error) Alert.alert("Error", error.message);

  const returTotalValue = useMemo(() => {
    const serverValue = parseInt(qty, 10);
    if (!serverValue) return data?.serverPrice || 1;
    let actualPriceCur = (data?.serverPrice || 1) / devise.curencyVal;
    let total = (serverValue * actualPriceCur).toFixed(2);
    return Number(total);
  }, [qty, data?.serverPrice, devise.curencyVal]);

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
    Toast.show({
      type: "success",
      text2: `${data?.serverName} has been successfully added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const toggleWishlist = () => {
    if (user && data) {
      if (checkIsProductIsInMyWish()) {
        removeFromWish(data._id);
      } else {
        const wish = { userId: user._id, ...data };
        addToWishList(wish);
        Toast.show({
          type: "success",
          text2: `${data.serverName} has been successfully added to your wishlist.`,
        });
      }
    }
  };

  const checkIsProductIsInMyWish = () => {
    return wishlist.some((wish) => wish._id === data?._id);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFA000", "#FF6B00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFA000" />
        </TouchableOpacity>
        <BlurView intensity={80} tint="dark" style={styles.blurView}>
          <Text style={styles.headerText}>{data?.serverName}</Text>
          <Text style={styles.subHeaderText}>{data?.serverCategory}</Text>
        </BlurView>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={toggleWishlist}
        >
          <Ionicons
            name={checkIsProductIsInMyWish() ? "heart" : "heart-outline"}
            size={24}
            color={checkIsProductIsInMyWish() ? "#ef4444" : "#FFA000"}
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.infoCard}
        >
          <View style={styles.infoRow}>
            <InfoItem
              title="Server Category"
              value={serverCat.split("-").join(" ")}
            />
            <InfoItem title="Server Name" value={data?.serverName || ""} />
          </View>
          <View style={styles.infoRow}>
            <InfoItem
              title="Server Price"
              value={`${((data?.serverPrice || 1) / devise.curencyVal).toFixed(2)} ${devise.currencyName.toUpperCase()}`}
            />
            <InfoItem
              title="Server Status"
              value={data?.serverStatus || ""}
              customStyle={
                data?.serverStatus === "Disponible"
                  ? styles.statusAvailable
                  : styles.statusUnavailable
              }
            />
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.quantityContainer}
        >
          <Text style={styles.quantityLabel}>How many kamas do you need?</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.quantityInput}
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={qty}
              onChangeText={setQty}
            />
            <Text style={styles.unitText}>M</Text>
          </View>
          <Text style={styles.note}>Note: 1 = 1 million</Text>
          {returTotalValue && (
            <Text style={styles.totalText}>
              Total: {returTotalValue} {devise.currencyName.toUpperCase()}
            </Text>
          )}
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeInRight.delay(600).duration(500)}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={[
            styles.button,
            styles.addToCartButton,
            !returTotalValue && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={!returTotalValue}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
          <Ionicons name="cart-outline" size={24} color="#3b3b3b" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.buyNowButton,
            !returTotalValue && styles.disabledButton,
          ]}
          onPress={handleBuyNow}
          disabled={!returTotalValue}
        >
          <Text style={styles.buttonText}>Buy now</Text>
        </TouchableOpacity>
      </Animated.View>

      <Toast config={toastConfig} />
    </View>
  );
};

const InfoItem = ({
  title,
  value,
  customStyle = {},
}: {
  title: string;
  value: string;
  customStyle?: ViewStyle;
}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoTitle}>{title}</Text>
    <View style={[styles.infoValue, customStyle]}>
      <Text style={styles.infoValueText}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  header: {
    height: 200,
    justifyContent: "flex-end",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#2C2C2C",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  wishlistButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#2C2C2C",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  blurView: {
    borderRadius: 15,
    overflow: "hidden",
    padding: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#FFE082",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    backgroundColor: "#1F1F1F",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    color: "#9A9A9A",
    marginBottom: 8,
  },
  infoValue: {
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 10,
  },
  infoValueText: {
    fontSize: 16,
    color: "#FFD54F",
    fontWeight: "bold",
  },
  statusAvailable: {
    backgroundColor: "#4CAF50",
  },
  statusUnavailable: {
    backgroundColor: "#2196F3",
  },
  quantityContainer: {
    backgroundColor: "#1F1F1F",
    borderRadius: 15,
    padding: 20,
  },
  quantityLabel: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    marginBottom: 10,
  },
  quantityInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    padding: 15,
  },
  unitText: {
    color: "#FFD54F",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
  },
  note: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 10,
  },
  totalText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#FFC107",
  },
  buyNowButton: {
    backgroundColor: "#FF9800",
  },
  buttonText: {
    color: "#3b3b3b",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default ServerPage;
