import React, { useState } from "react";
import { convertedDate, orderBuyStatus, orderSellStatus } from "@/lib/utils";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const OrderFilterModal = ({
  visible,
  onClose,
  filterType,
  activeStatus,
  setActiveStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  visible: boolean;
  onClose: () => void;
  filterType: string;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  startDate: Date;
  setStartDate: (dateType: Date) => void;
  endDate: Date;
  setEndDate: (dateType: Date) => void;
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const statusFilter =
    filterType === "buy-orders" ? orderBuyStatus : orderSellStatus;

  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  const handleResetFilter = () =>{
    setStartDate(new Date());
    setEndDate(new Date());
    setActiveStatus("");
    onClose();
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <LinearGradient
              colors={["#3A3A3A", "#2C2C2C"]}
              className="w-full max-h-[80%] rounded-t-[20px] pb-8 pt-2 px-4"
            >
              <View className="w-16 h-1 bg-gray-400 rounded-full self-center mb-4" />
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl text-white font-bold">
                  Filter Orders
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close-circle" size={28} color="#FFA500" />
                </TouchableOpacity>
              </View>
              <ScrollView
                className="w-full"
                showsVerticalScrollIndicator={false}
              >
                <Text className="text-white font-bold text-lg mb-3">
                  Status
                </Text>
                <View className="flex-row flex-wrap justify-between mb-6">
                  {statusFilter.map((status) => (
                    <TouchableOpacity
                      key={status}
                      activeOpacity={0.7}
                      className={`${
                        activeStatus === status
                          ? "bg-secondary-500"
                          : "bg-gray-700"
                      } py-2 px-4 rounded-full mb-2 w-[48%]`}
                      onPress={() => setActiveStatus(status)}
                    >
                      <Text
                        className={`text-sm font-bold ${
                          activeStatus === status
                            ? "text-white"
                            : "text-gray-300"
                        } text-center`}
                      >
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text className="text-white font-bold text-lg mb-3">
                  Date Range
                </Text>
                <View className="w-full flex-col items-center mb-6">
                  <TouchableOpacity
                    className="w-full bg-gray-700 py-3 px-4 rounded-lg mb-3 flex-row justify-between items-center"
                    onPress={() => setShowStartPicker(true)}
                  >
                    <Text className="text-white text-base font-medium">
                      Start Date
                    </Text>
                    <Text className="text-secondary-500 text-base font-bold">
                      {convertedDate(startDate)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-full bg-gray-700 py-3 px-4 rounded-lg flex-row justify-between items-center"
                    onPress={() => setShowEndPicker(true)}
                  >
                    <Text className="text-white text-base font-medium">
                      End Date
                    </Text>
                    <Text className="text-secondary-500 text-base font-bold">
                      {convertedDate(endDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
                {showStartPicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="spinner"
                    onChange={onStartDateChange}
                    textColor="white"
                  />
                )}
                {showEndPicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="spinner"
                    onChange={onEndDateChange}
                    textColor="white"
                  />
                )}

                <TouchableOpacity
                  className="w-full bg-secondary-500  py-4 rounded-lg mt-4"
                  onPress={handleResetFilter}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Reset Filters
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OrderFilterModal;
