import { shadowStyle } from "@/styles";
import { Pressable, View, AntDesign, Feather, Input } from "@/ui";

import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  onPress: () => void;
  placeholder: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({
  onPress,
  placeholder,
  query,
  setQuery,
}: SearchBarProps) => {
  return (
    <View className="w-full px-5">
      <View className="w-full flex flex-row justify-start items-center gap-x-5">
        <View
          className="w-[75%] flex flex-row justify-start items-center bg-[#E5E5E5] rounded-lg border border-[#E5E5E5]"
          style={shadowStyle.shadowBlack}
        >
          <View className="ml-3">
            <Feather name="search" size={24} color="black" />
          </View>
          <Input
            className={`rounded-full p-3 font-bold text-[15px] w-full text-left`}
            placeholder={placeholder}
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
        </View>
        <View
          className="w-16 h-full flex flex-row justify-center items-center bg-[#E5E5E5] rounded-lg border border-[#E5E5E5]"
          style={shadowStyle.shadowBlack}
        >
          <Pressable onPress={onPress}>
            <AntDesign name="filter" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

interface MockSearchBarProps {
  onPress: () => void;
  placeholder: string;
}
export const MockSearchBar = ({ onPress, placeholder }: MockSearchBarProps) => {
  return (
    <View className="w-full px-5">
      <Pressable className="w-full" onPress={onPress}>
        <View className="w-full flex flex-row justify-start items-center gap-x-5">
          <View
            className="flex flex-row w-[75%] justify-start items-center bg-[#E5E5E5] rounded-lg border border-[#E5E5E5]"
            style={shadowStyle.shadowBlack}
          >
            <View className="ml-3">
              <Feather name="search" size={24} color="black" />
            </View>
            <Input
              className={`rounded-full p-2 font-bold text-[15px] w-full text-left`}
              placeholder={placeholder}
              editable={false}
            />
          </View>
          <View
            className="w-16 h-full flex flex-row justify-center items-center bg-[#E5E5E5] rounded-lg border border-[#E5E5E5]"
            style={shadowStyle.shadowBlack}
          >
            <AntDesign name="filter" size={24} color="black" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
