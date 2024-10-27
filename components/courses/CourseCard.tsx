import { router } from "expo-router";

import { setCourse } from "@/core/store/course";
import { Pressable, Text, View, ImageBackground } from "@/ui";

import type { Course } from "@/types";

interface CourseCardProps {
  item: Course;
}

export const CourseCard = ({ item }: CourseCardProps) => {
  const onPress = () => {
    setCourse({ courseId: item.id });
    router.push(`/(auth)/(courses)`);
  };
  return (
    <View key={item.id} className="w-full">
      <Pressable
        onPress={onPress}
        className="w-full flex flex-row my-2 gap-x-2"
      >
        <View className="rounded-xl relative w-20 h-20">
          <ImageBackground
            source={item.imageUrl!}
            className="rounded-xl"
            alt={item.title}
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 4,
              borderRadius: 12,
            }}
            imageStyle={{ borderRadius: 12 }}
          >
            <View className="w-20 h-20 rounded-lg"></View>
          </ImageBackground>
        </View>
        <View className="relative w-9/12 flex flex-row justify-between">
          <View className="flex flex-col">
            <View>
              <Text className="text-xl font-bold">{item.title}</Text>
            </View>
            <View>
              <Text className="text-base font-semibold">
                {item?.category?.name!}
              </Text>
            </View>
            <View>
              <Text className="text-xs">{`${item.chapters.length!} chapters`}</Text>
            </View>
          </View>
          <View>
            <Text className={` font-bold text-base`}>{`₹ ${item.price!}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
