import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

import { setCourse } from "@/core/store/course";
import { Course } from "@/types/type";

export const CourseCard = ({ item }: { item: Course }) => {
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
        <View className="rounded-xl relative w-20">
          <ImageBackground
            source={item.imageUrl!}
            className="rounded-xl"
            alt={item.title}
            style={{
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
            <Text
              className={`text-black font-bold text-base`}
              style={{ color: "black" }}
            >
              {`₹ ${item.price!}`}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
