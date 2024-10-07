import { View } from "react-native";

export const DotSwipe = () => {
  return (
    <View
      style={{
        backgroundColor: "#9A9A9A",
        width: 12,
        height: 12,
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 0,
        marginBottom: -20,
      }}
    />
  );
};
export const DotActiveSwipe = () => {
  return (
    <View
      style={{
        backgroundColor: "#FFA000",
        width: 12,
        height: 12,
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 0,
        marginBottom: -20,
      }}
    />
  );
};
