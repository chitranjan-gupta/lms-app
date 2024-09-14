import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { Pressable, TextInput, View } from "react-native";

import { icons } from "@/constants";

export const SearchBar = ({ onPress }: { onPress: () => void }) => {
  return (
    <View className="w-full px-3">
      <View
        className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100`}
      >
        <Image source={icons.search} className={`w-6 h-6 ml-3 `} />
        <TextInput
          className={`rounded-full p-4 font-bold text-[15px] flex-1 text-left`}
          placeholder="Search Courses"
        />
        <Pressable className="mr-2" onPress={onPress}>
          <AntDesign name="filter" size={25} color="black" />
        </Pressable>
      </View>
    </View>
  );
};
