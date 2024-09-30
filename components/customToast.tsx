import { ToastProps } from "@/types/type";
import { Text } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Toast, { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        backgroundColor: "#1F1F1F",
        top: 0,
        left: 2,
        right: 2,
        height: 80
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        display: "none",
      }}
      text2Style={{
        fontSize: 17,
        fontWeight: "400",
        color: "#16a34a",
      }}
      text2NumberOfLines={2}
    >
      <Icon
        name="check-circle"
        size={24}
        color="#16a34a"
        style={{ marginRight: 10 }}
      />
    </BaseToast>
  ),
    error: (props) => (
      <ErrorToast
        style={{
          borderLeftColor: "#2C2C2C",
          backgroundColor: "#1F1F1F",
          width: "100%",
        }}
        {...props}
        text1Style={{
          display: "none",
        }}
        text2Style={{
          fontSize: 17,
          fontWeight: "400",
          color: "#dc2626",
        }}
      />
    ),
  //   successToast: ({ text1, props }: { text1: string }) => (
  //     <View
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         gap: 10,
  //         width: "100%",
  //         backgroundColor: "#1F1F1F",
  //         top: 0,
  //         left: 2,
  //         right: 2,
  //       }}
  //     >
  //       <Icon
  //         name="check-circle"
  //         size={24}
  //         color="#16a34a"
  //         style={{ marginRight: 10 }}
  //       />
  //       <Text
  //         style={{
  //           fontSize: 18,
  //           fontWeight: "400",
  //           color: "#16a34a",
  //         }}
  //       >
  //         {text1}
  //       </Text>
  //     </View>
  //   ),
};
