import { Image, Text, View } from "@/ui";

import { ActivityType } from "./data";

type Props = {
  item: ActivityType;
};

const Activity = ({ item }: Props) => {
  return (
    <View className="flex-row my-[14px] mx-[16px] items-center justify-between">
      <View className="!bg-[#222222] rounded-[18px]">
        {/* <Image
          source={item.image}
          style={{ flex: 1, width: 44, height: 44, margin: 14 }}
          contentFit="contain"
        /> */}
      </View>
      <View className="flex-[1] mx-[16px]">
        <Text className="!text-white text-[20px] font-bold">{item.name}</Text>
        <Text className="!text-white text-[14px]">{item.date}</Text>
      </View>
      <Text className="!text-white text-[18px] font-bold">{item.price}</Text>
    </View>
  );
};

export default Activity;
