import { useCheckToken } from "@/hooks/checkIsUserTokenValid";
import useStore from "@/lib/store";
import { Tabs } from "expo-router";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const Layout = () => {
  const { removeUser } = useStore();

  const userToken = useCheckToken();
  const token = userToken?.token;
  // console.log(token);
  // console.log(token?.exp - Math.floor(Date.now() / 1000));
  useEffect(() => {
    const checkToken = async () => {
      try {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const tokenExp = token?.exp;

        if (tokenExp && tokenExp - currentTimestamp <= 0) {
          await SecureStore.deleteItemAsync("token");
          removeUser();
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, [token, removeUser]);

  const TabIcon = ({
    focused,
    source,
    size,
  }: {
    focused: boolean;
    source: string;
    size: number;
  }) => (
    <View
      className={`flex items-center justify-center h-16 w-16 rounded-full p-2 ${focused ? "text-secondary-500" : ""}`}
    >
      <Icon
        name={source}
        color={`${focused ? "#FFA000" : "#fff"}`}
        size={size}
      />
    </View>
  );
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1F1F1F",
          borderTopWidth: 0,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          overflow: "hidden",
          paddingBottom: 0,
          paddingTop: 0,
          height: 70,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="home" size={38} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="newspaper" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="sellkamas"
        options={{
          title: "Sell Kamas",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="sell" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="dofus-game"
        options={{
          title: "Dofus",
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <TabIcon focused={focused} source="sports-esports" size={38} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source="account-circle" size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="(dofus)/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="(auth)/sign-in"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="(auth)/sign-up"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="server/[id]"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
};

export default Layout;
