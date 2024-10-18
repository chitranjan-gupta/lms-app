import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { Pressable, TextInput } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { icons } from "@/constants";
import { shadowStyle } from "@/styles";

export const SearchBar = ({
  onPress,
  placeholder,
}: {
  onPress: () => void;
  placeholder: string;
}) => {
  return (
    <ThemedView
      className="w-full px-5"
      lightColor="transparent"
      darkColor="black"
    >
      <ThemedView
        className="w-full flex flex-row justify-start items-center gap-x-5"
        lightColor="transparent"
        darkColor="black"
      >
        <ThemedView
          className="flex flex-row justify-start items-center bg-gray-200 rounded-lg border border-gray-200"
          style={shadowStyle.shadowBlack}
        >
          <Image source={icons.search} className={`w-6 h-6 ml-3`} />
          <TextInput
            className={`rounded-full p-4 font-bold text-[15px] w-2/3 text-left`}
            placeholder={placeholder}
          />
        </ThemedView>
        <ThemedView
          className="w-16 h-full flex flex-row justify-center items-center bg-gray-200 rounded-lg border border-gray-200"
          style={shadowStyle.shadowBlack}
        >
          <Pressable onPress={onPress}>
            <AntDesign name="filter" size={24} color="black" />
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};
