import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SellServerType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PaymentModal } from "@/components/PaymentModal";
import { BlurView } from "expo-blur";
import { SellInputField } from "@/components/SellInputField";
import useStore from "@/lib/store";
import { codeGenerated, getLabel, getPlaceholder } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { toastConfig } from "@/components/customToast";
import Toast from "react-native-toast-message";

const SellServer = () => {
  const { devise, user } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [email, onChangeEmail] = useState("");
  const [inGameName, onChangeInGameName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantity, onChangeQuantity] = useState("1");
  const [comment, onChangeComment] = useState("");
  const [infoDetails, onChangeInfoDetails] = useState("");
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  // console.log(comment);

  const { id }: { id: string } = useLocalSearchParams();
  const tabSplit = id.split("-");
  const serverSellId = tabSplit[2];
  const serverCat = tabSplit.slice(0, tabSplit.length - 1).join("-");

  const showToast = () => {
    Toast.show({
      type: "success",
      text2: `Order sell added successfully!`,
    });
  };

  const onClose = () => {
    setOpenModal(false);
  };
  const handlePaymentMethods = (method: string) => {
    setPaymentMethod(method);
    setOpenModal(false);
  };

  const getSingleServer = (): Promise<SellServerType> => {
    return fetch(
      `${process.env.EXPO_PUBLIC_IBYTRADE_CLIENT_URL}/server/${serverSellId}`
    ).then((res) => res.json());
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["server-sell", serverSellId],
    queryFn: getSingleServer,
  });

  const returTotalValue = useMemo(() => {
    const serverValue = parseInt(quantity, 10);
    if (!serverValue) return 0;
    let actualPriceCur = (data?.serverPriceDh || 0) / devise.curencyVal;
    let total = (serverValue * actualPriceCur).toFixed(2);
    return Number(total);
  }, [quantity, data?.serverPriceDh]);

  if (error) Alert.alert("Error", error.message);

  const handleAddOrder = () => {
    let paymentInfoDetails = `${paymentMethod}<br/>${infoDetails}`;

    let qty = Number(quantity);

    let unitPrice = ((data?.serverPriceDh || 1) / devise.curencyVal).toFixed(2);

    const order = {
      userId: user?._id,
      numBuy: codeGenerated(),
      jeu: data?.serverCategory,
      server: data?.serverName,
      pu: unitPrice,
      qte: qty,
      totalPrice: returTotalValue,
      paymentMethod,
      gameName: inGameName,
      paymentInfoDetails,
      comments: comment,
      email: user?.email,
      currencymethod: devise.currencyName,
    };
    return order;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const order = handleAddOrder();
      try {
        setIsOrderLoading(true);
        const result = await axios.post(
          `${process.env.EXPO_PUBLIC_IBYTRADE_CLIENT_URL}/buy`,
          order
        );
        if (result.data) {
          showToast();
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsOrderLoading(false);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
      </LinearGradient>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <SellInputField
            label="Contact email"
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <SellInputField
            label="In-game name"
            value={inGameName}
            onChangeText={onChangeInGameName}
            placeholder="Enter your in-game name"
          />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Payment methods</Text>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => setOpenModal(true)}
            >
              <Text style={styles.paymentButtonText}>
                {paymentMethod ? paymentMethod : "Choose payment methods"}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#FFB300" />
            </TouchableOpacity>
          </View>
          <PaymentModal
            openModal={openModal}
            onClose={onClose}
            paymentMethod={paymentMethod}
            handlePaymentMethods={handlePaymentMethods}
          />
          {paymentMethod && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{getLabel(paymentMethod)}</Text>
              <TextInput
                style={styles.input}
                placeholder={getPlaceholder(paymentMethod)}
                value={infoDetails}
                onChangeText={onChangeInfoDetails}
                placeholderTextColor="#9A9A9A"
              />
            </View>
          )}
          <SellInputField
            label="Quantity of kamas (M)"
            value={quantity}
            onChangeText={onChangeQuantity}
            placeholder="Enter quantity"
            keyboardType="numeric"
            isQty={true}
          />

          <Text className="text-red-200 text-bs font-extrabold mb-4">
            Note: 1 = 1 million
          </Text>

          <SellInputField
            label="Add comment"
            value={comment}
            onChangeText={onChangeComment}
            placeholder="Please add a comment"
            multiline={true}
          />
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              Price per million:{" "}
              {((data?.serverPriceDh || 1) / devise.curencyVal)?.toFixed(2)}
              {devise.currencyName === "euro" && "EUR"}
              {devise.currencyName === "dollar" && "USD"}
              {devise.currencyName === "mad" && "MAD"}
            </Text>
            <Text style={styles.priceText}>
              Total:{returTotalValue}
              {devise.currencyName === "euro" && "EUR"}
              {devise.currencyName === "dollar" && "USD"}
              {devise.currencyName === "mad" && "MAD"}
            </Text>
            <Text style={styles.bonusText}>
              Bonus +{(50 / devise.curencyVal)?.toFixed(2)}
              {devise.currencyName === "euro" && "EUR"}
              {devise.currencyName === "dollar" && "USD"}
              {devise.currencyName === "mad" && "MAD"} if order more than +
              {(3000 / devise.curencyVal)?.toFixed(2)}
              {devise.currencyName === "euro" && "EUR"}
              {devise.currencyName === "dollar" && "USD"}
              {devise.currencyName === "mad" && "MAD"}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.addOrderButton,
              {
                opacity:
                  returTotalValue <= 0 || !user || isOrderLoading ? 0.6 : 1,
              },
            ]}
            activeOpacity={0.5}
            disabled={returTotalValue <= 0 || !user || isOrderLoading}
            onPress={() => mutation.mutate()}
          >
            <Text style={styles.addOrderButtonText}>
              {isOrderLoading ? "submitting..." : "Add order"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
  },
  scrollView: {
    flex: 1,
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD54F",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3B3B3B",
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
  formContainer: {
    padding: 20,
  },

  paymentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#3B3B3B",
  },
  paymentButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  priceContainer: {
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  priceText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  bonusText: {
    fontSize: 14,
    color: "#FFC107",
    fontWeight: "bold",
  },
  addOrderButton: {
    backgroundColor: "#FFA000",
    borderRadius: 10,
    padding: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  addOrderButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginPrompt: {
    textAlign: "center",
    color: "#9A9A9A",
    marginBottom: 20,
  },
  loginLink: {
    color: "#FFA000",
    fontWeight: "bold",
  },
});

export default SellServer;
