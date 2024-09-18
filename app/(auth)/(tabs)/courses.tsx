import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Categories } from "@/components/Categories";
import { RecentCourses } from "@/components/Courses";
import { SearchBar } from "@/components/SearchBar";
import { useCategories } from "@/core/store/categories";
import { useCourses } from "@/core/store/courses";

const Courses = () => {
  const courses = useCourses((state) => state.courses);
  const loading = useCourses((state) => state.status);
  const categories = useCategories((state) => state.categories);
  const isPending = useCategories((state) => state.status);
  const [priceSlider, setPriceSlider] = useState<number>(90);
  const [durations, setDurations] = useState<string[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setDurations([
      "3-8 Hours",
      "8-14 Hours",
      "14-20 Hours",
      "20-24 Hours",
      "24-30 Hours",
    ]);
  }, [setDurations]);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const snapPoints = ["50%", "70%"];
  return (
    <View className="bg-white w-full h-full">
      {loading === "pending" && isPending === "pending" ? (
        <View className="w-full h-full flex flex-row justify-center items-center">
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      ) : (
        <SafeAreaView className="bg-white w-full h-full">
          <View className="w-full px-5">
            <View className="w-full flex flex-row items-center justify-between my-5">
              <Text className="text-3xl font-extrabold">Find Your Courses</Text>
            </View>
          </View>
          <SearchBar onPress={handleOpenPress} />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-3xl font-bold mt-3 mb-3">Categories</Text>
            <Pressable>
              <MaterialCommunityIcons
                name="sort-alphabetical-ascending"
                size={24}
                color="black"
              />
              {/* <MaterialCommunityIcons name="sort-alphabetical-descending" size={24} color="black" /> */}
            </Pressable>
          </View>
          <Categories categories={categories} loading={isPending} />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-3xl font-bold mb-3">Courses</Text>
            <View className="flex flex-row">
              <Pressable>
                <MaterialCommunityIcons
                  name="sort-calendar-ascending"
                  size={24}
                  color="black"
                />
                {/* <MaterialCommunityIcons
                  name="sort-calendar-descending"
                  size={24}
                  color="black"
                /> */}
              </Pressable>
              <Pressable>
                <MaterialCommunityIcons
                  name="sort-alphabetical-ascending"
                  size={24}
                  color="black"
                />
                {/* <MaterialCommunityIcons name="sort-alphabetical-descending" size={24} color="black" /> */}
              </Pressable>
              <Pressable>
                <MaterialCommunityIcons
                  name="sort-clock-ascending"
                  size={24}
                  color="black"
                />
                {/* <MaterialCommunityIcons name="sort-clock-descending" size={24} color="black" /> */}
              </Pressable>
            </View>
          </View>
          <RecentCourses courses={courses} loading={loading} />
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
          >
            <View className="p-2 w-full flex flex-col">
              <View className="w-full flex flex-row justify-start items-start gap-x-[120px]">
                <Pressable onPress={handleClosePress} className="mt-1">
                  <AntDesign name="close" size={25} color="black" />
                </Pressable>
                <View>
                  <Text className="text-lg font-black">Search Filter</Text>
                </View>
              </View>
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
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                />
              </View>
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
                    maximumTrackTintColor="blue"
                    minimumTrackTintColor="yello"
                    style={{ width: "100%", height: 40 }}
                  />
                </View>
              </View>
              <View>
                <Text className="text-xl font-bold mt-3 mb-3">Categories</Text>
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
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                />
              </View>
              <View className="flex flex-row gap-x-3 px-2">
                <Pressable className="bg-white border border-blue-500 rounded-xl w-[80px] h-[50px] flex flex-row justify-center items-center">
                  <Text className="text-blue-500 font-black text-base">
                    Clear
                  </Text>
                </Pressable>
                <Pressable className="bg-blue-500 rounded-xl w-[270px] h-[50px] flex flex-row justify-center items-center">
                  <Text className="text-white">Apply Filter</Text>
                </Pressable>
              </View>
            </View>
          </BottomSheet>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Courses;
