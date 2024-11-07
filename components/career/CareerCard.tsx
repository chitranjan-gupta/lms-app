import { router } from "expo-router";

import { images } from "@/constants";
import { setCareer } from "@/core/store/career";
import { bookmarkRow } from "@/core/store/kanban";
import { camelCase } from "@/lib";
import { shadowStyle } from "@/styles";
import { Pressable, Text, View, Feather, Entypo, Image } from "@/ui";

import type { Career } from "@/types";

interface CareerCardProps {
  item: Career;
}

export const CareerCard = ({ item }: CareerCardProps) => {
  const onPress = () => {
    setCareer({ careerId: item.id });
    router.push(`/(auth)/(careers)/${item.id}`);
  };
  const onBookmark = () => {
    bookmarkRow({
      title: item.title,
      subtitle: item.company.name,
      career: item,
    });
  };
  return (
    <View
      key={item.id}
      className="w-full rounded-3xl bg-white dark:bg-gray-200 mb-5"
      style={shadowStyle.shadowSmall}
    >
      <Pressable onPress={onPress} className="w-full flex flex-col gap-y-0 p-5">
        <View className="rounded-xl w-full flex flex-row justify-between items-center">
          <Image
            source={item?.company?.logo_url! || images.onboarding1}
            className="rounded-xl"
            alt={item?.company?.name}
            style={{
              borderRadius: 12,
              width: 50,
              height: 50,
            }}
            contentFit="contain"
          />
          <View>
            <Pressable onPress={onBookmark}>
              <Feather name="bookmark" size={24} color={"#524B6B"} />
            </Pressable>
          </View>
        </View>
        <View className="w-full flex flex-col gap-y-3">
          <View className="w-full flex flex-col">
            <View className="w-full">
              <Text
                className="text-xl font-bold w-full !text-[#150A33]"
                numberOfLines={1}
              >
                {item?.title || "Unknown"}
              </Text>
            </View>
            <View className="flex flex-row w-full overflow-hidden">
              <View className="w-1/4 flex flex-row items-start gap-x-1">
                <Text className="text-base !text-[#524B6B]" numberOfLines={1}>
                  {item?.company?.name || "Unknown"}
                </Text>
                <Entypo name="dot-single" size={24} color={"#524B6B"} />
              </View>

              <View className="w-3/4 ml-3">
                <Text
                  className="text-base w-full !text-[#524B6B]"
                  numberOfLines={1}
                >
                  {item?.location || "Unknown"}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-around">
            <View className="p-2 rounded-xl !bg-gray-200">
              <Text className="text-sm !text-[#524B6B]">
                {item?.department || "Unknown"}
              </Text>
            </View>
            <View className="p-2 rounded-xl !bg-gray-200">
              <Text className="text-sm !text-[#524B6B]">
                {camelCase(item?.career_type || "Unknown")}
              </Text>
            </View>
            <View className="p-2 rounded-xl !bg-gray-200">
              <Text className="text-sm !text-[#524B6B]">
                {camelCase(item?.level || "Unknown")}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-base !text-red-500" numberOfLines={1}>
                {new Date(
                  item?.application_deadline || new Date(),
                ).toDateString()}
              </Text>
            </View>
            <View>
              <Text className="text-base !text-[#524B6B]" numberOfLines={1}>
                {item?.salary_range || "Unknown"}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
