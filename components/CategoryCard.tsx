import { View, Text } from "react-native";

import { bgcolors } from "@/constants/Colors";

export const CategoryCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <View
      key={item.id}
      className={`w-[130px] h-[50px] rounded-xl flex flex-row justify-center items-center mx-2`}
      style={{
        backgroundColor: bgcolors[index],
      }}
    >
      <Text className={`font-bold text-md`} style={{ color: "white" }}>
        {item.name}
      </Text>
    </View>
  );
};
