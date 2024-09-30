import useStore from "@/lib/store";
import { currencies } from "@/lib/utils";
import { CUR } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const CurrencyModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { devise } = useStore();
  const { addNewDevise } = useStore();
  const [isActiveCurrency, setIsActiveCurrency] = useState<string>("");

  const fetchCurrency = async (currency: string): Promise<CUR[]> => {
    // const currency = queryKey[1];
    const response = await fetch(
      `https://services.ibendouma.com/api/${currency}`
    );
    if (!response.ok) {
      throw new Error("Fetching currency failed: ");
    }

    return response.json();
  };

  const { isLoading, error, data } = useQuery<CUR[], Error>({
    queryKey: ["currency", isActiveCurrency],
    queryFn: () => fetchCurrency(isActiveCurrency),
    enabled: !!isActiveCurrency,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      let keys = Object.keys(data[0]);
      let values = Object.values(data[0]);
      let name = keys[1];
      let val = values[1];
      const dev = {
        currencyName: name,
        curencyVal: val,
      };
      addNewDevise(dev);
    }
  }, [data, addNewDevise]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/20 bg-opacity-50">
          <TouchableWithoutFeedback>
            <View className="bg-[#2C2C2C] w-40 h-40 flex-col items-center justify-center bottom-[230px] ml-60 rounded-[10px] pb-2">
              <View className="w-full self-center bg-primary-200 mb-4 rounded-[10px] p-2">
                <Text className="text-base text-center text-white font-extrabold">
                  Change currency
                </Text>
              </View>
              <View className="w-full flex flex-col items-center mb-6">
                {currencies.map((cur) => (
                  <TouchableOpacity
                    key={cur.name}
                    activeOpacity={0.5}
                    className={` ${devise.currencyName === cur.name ? "bg-primary-200" : ""} p-1.5 w-28 rounded-full`}
                    onPress={() => setIsActiveCurrency(cur.name)}
                  >
                    <Text
                      className={`text-base font-extrabold ${devise.currencyName === cur.name ? "text-secondary-500" : "text-gray-200"} text-center uppercase`}
                    >
                      {cur.id}
                    </Text>
                  </TouchableOpacity>
                ))}
                {/* <TouchableOpacity activeOpacity={0.5}>
                  <Text className="text-base font-extrabold text-gray-200 my-2">
                    Euro
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}>
                  <Text className="text-base font-extrabold text-gray-200">
                    Dollar
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CurrencyModal;
