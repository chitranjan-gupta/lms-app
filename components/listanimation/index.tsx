import { MotiView } from "moti";
import { TouchableWithoutFeedback, Dimensions } from "react-native";

import { images } from "@/constants";
import { Text, View, Image, List } from "@/ui";

interface ListRevealAnimationProps {
  data: {
    id: number;
    name: string;
    price: string;
  }[];
}

export const ListRevealAnimation = ({ data }: ListRevealAnimationProps) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: {
      id: number;
      name: string;
      price: string;
    };
    index: number;
  }) => {
    return (
      <MotiView
        style={{ width: Dimensions.get("window").width / 2 - 20 }}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1000 + index * 200 }}
      >
        <View className="m-[15px] rounded-[10px] overflow-hidden">
          <Image
            source={images.onboarding1}
            style={{ flex: 1, width: "100%", height: 100 }}
          />
        </View>
        <Text className="text-black font-bold ml-[15px]">{item.name}</Text>
        <Text className="!text-orange-500 dark:!text-orange-500 font-bold ml-[15px] mt-[10px]">
          {item.price}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("BUY NOW!", index);
          }}
        >
          <View className="bg-[#62513E] p-[10px] m-[15px] rounded-[10px]">
            <Text className="text-white text-center">Buy Now!</Text>
          </View>
        </TouchableWithoutFeedback>
      </MotiView>
    );
  };
  return (
    <List
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={10}
    />
  );
};
