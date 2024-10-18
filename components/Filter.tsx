import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import { forwardRef, useState, Ref } from "react";
import { Pressable, FlatList, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { snapPoints } from "@/constants";
import { Category } from "@/types/type";

interface FilterProps {
  handleClosePress: () => void;
  categories?: Category[];
  durations?: string[];
}

const FilterComponent = (
  { handleClosePress, categories, durations }: FilterProps,
  ref: Ref<BottomSheet>,
) => {
  const colorScheme = useColorScheme();
  const [priceSlider, setPriceSlider] = useState<number>(90);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: colorScheme === "light" ? "white" : "black",
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === "light" ? "black" : "white",
      }}
    >
      <ThemedView
        className="p-2 w-full h-full flex flex-col"
        lightColor="white"
        darkColor="black"
      >
        <ThemedView
          className="w-full flex flex-row justify-start items-start gap-x-[120px]"
          lightColor="white"
          darkColor="black"
        >
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
          <ThemedView lightColor="white" darkColor="black">
            <ThemedText className="text-lg font-black">
              Search Filter
            </ThemedText>
          </ThemedView>
        </ThemedView>
        {categories && (
          <ThemedView lightColor="white" darkColor="black">
            <ThemedText className="text-xl font-bold mt-3 mb-3">
              Categories
            </ThemedText>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <ThemedView
                  className="bg-blue-500 h-[25px] mr-2 p-1 rounded-md"
                  lightColor="white"
                  darkColor="black"
                >
                  <ThemedText className="text-white text-xs">
                    {item.name}
                  </ThemedText>
                </ThemedView>
              )}
              style={{
                height: 40,
                flexGrow: 0,
              }}
              keyExtractor={(_item, index) => index.toString()}
              horizontal={true}
            />
          </ThemedView>
        )}
        <ThemedView
          className="flex flex-col my-3"
          lightColor="white"
          darkColor="black"
        >
          <ThemedView lightColor="white" darkColor="black">
            <ThemedText className="text-lg font-black">Price</ThemedText>
          </ThemedView>
          <ThemedView className="w-full" lightColor="white" darkColor="black">
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
          </ThemedView>
        </ThemedView>
        {durations && (
          <ThemedView lightColor="white" darkColor="black">
            <ThemedText className="text-xl font-bold mt-3 mb-3">
              Durations
            </ThemedText>
            <FlatList
              data={durations}
              renderItem={({ item }) => (
                <ThemedView
                  className="bg-blue-500 h-[25px] mr-2 p-1 rounded-md"
                  lightColor="white"
                  darkColor="black"
                >
                  <ThemedText className="text-white text-xs">{item}</ThemedText>
                </ThemedView>
              )}
              style={{
                height: 40,
                flexGrow: 0,
              }}
              keyExtractor={(_item, index) => index.toString()}
              horizontal={true}
            />
          </ThemedView>
        )}
        <ThemedView
          className="flex flex-row gap-x-3 px-2"
          lightColor="white"
          darkColor="black"
        >
          <Pressable className="border border-blue-500 rounded-xl w-[80px] h-[50px] flex flex-row justify-center items-center">
            <ThemedText className="text-blue-500 font-black text-base">
              Clear
            </ThemedText>
          </Pressable>
          <Pressable className="bg-blue-500 rounded-xl w-[270px] h-[50px] flex flex-row justify-center items-center">
            <ThemedText className="text-white text-base font-bold">
              Apply Filter
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </BottomSheet>
  );
};

export const Filter = forwardRef<BottomSheet, FilterProps>(FilterComponent);
