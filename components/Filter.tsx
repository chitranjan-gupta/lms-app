import Slider from "@react-native-community/slider";
import { useColorScheme } from "nativewind";
import { useState } from "react";

import {
  Pressable,
  FlatList,
  Text,
  View,
  Modal,
  type ModalReturn,
  AntDesign,
} from "@/ui";

import type { Category } from "@/types";

interface FilterProps {
  handleClosePress: () => void;
  modal: ModalReturn;
  categories?: Category[];
  durations?: string[];
}

export const Filter = ({
  handleClosePress,
  modal,
  categories,
  durations,
}: FilterProps) => {
  const { colorScheme } = useColorScheme();
  const [priceSlider, setPriceSlider] = useState<number>(90);

  return (
    <Modal ref={modal.ref}>
      <View className="p-2 w-full h-full flex flex-col bg-white dark:bg-black">
        <View className="w-full flex flex-row justify-start items-start gap-x-[120px]">
          <Pressable
            onPress={handleClosePress}
            accessibilityLabel="Close filter"
            className="mt-1"
          >
            <AntDesign
              name="close"
              size={25}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </Pressable>
          <View>
            <Text className="text-lg font-black">Search Filter</Text>
          </View>
        </View>
        {categories && (
          <View>
            <Text className="text-xl font-bold mt-3 mb-3">Categories</Text>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <View className="bg-blue-500 h-[25px] mr-2 p-1 rounded-md">
                  <Text className="text-white text-xs">{item.name}</Text>
                </View>
              )}
              style={{
                height: 40,
                flexGrow: 0,
              }}
              keyExtractor={(_item, index) => index.toString()}
              horizontal={true}
            />
          </View>
        )}
        <View className="flex flex-col my-3">
          <View>
            <Text className="text-lg font-black">Price</Text>
          </View>
          <View className="w-full">
            <Slider
              minimumValue={0}
              maximumValue={20000}
              value={priceSlider}
              onValueChange={(value) => setPriceSlider(value)}
              step={100}
              maximumTrackTintColor={colorScheme === "light" ? "blue" : "white"}
              minimumTrackTintColor={colorScheme === "light" ? "blue" : "white"}
              style={{ width: "100%", height: 40 }}
            />
          </View>
        </View>
        {durations && (
          <View>
            <Text className="text-xl font-bold mt-3 mb-3">Durations</Text>
            <FlatList
              data={durations}
              renderItem={({ item }) => (
                <View className="bg-blue-500 h-[25px] mr-2 p-1 rounded-md">
                  <Text className="text-white text-xs">{item}</Text>
                </View>
              )}
              style={{
                height: 40,
                flexGrow: 0,
              }}
              keyExtractor={(_item, index) => index.toString()}
              horizontal={true}
            />
          </View>
        )}
        <View className="flex flex-row gap-x-3 px-2">
          <Pressable className="border border-blue-500 rounded-xl w-[80px] h-[50px] flex flex-row justify-center items-center">
            <Text className="text-blue-500 font-black text-base">Clear</Text>
          </Pressable>
          <Pressable className="bg-blue-500 rounded-xl w-[270px] h-[50px] flex flex-row justify-center items-center">
            <Text className="text-white text-base font-bold">Apply Filter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
