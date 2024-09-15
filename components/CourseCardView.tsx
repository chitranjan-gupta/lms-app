import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

import { setCourse } from "@/core/store/course";
import { Course } from "@/types/type";

export const CourseCardView = ({ item }: { item: Course }) => {
  const onPress = () => {
    setCourse({ courseId: item.id });
    router.push(`/(auth)/(courses)`);
  };
  return (
    <View className="mx-2 rounded-xl">
      <ImageBackground
        source={item.imageUrl!}
        className="rounded-xl"
        style={{ borderRadius: 12 }}
        imageStyle={{ borderRadius: 12 }}
      >
        <Pressable onPress={onPress} className="rounded-xl">
          <View
            key={item.id}
            className={`w-[300px] h-[200px] rounded-xl flex flex-col justify-between items-start p-3`}
          >
            <View className="h-[30px] rounded-xl bg-transparent flex flex-row p-1">
              <Text
                className={`text-white font-bold text-base`}
                style={{ color: "white" }}
              >
                {item?.category?.name!}
              </Text>
            </View>
            <View className="h-[50px] flex flex-row justify-between w-full">
              <View className="flex flex-col">
                <Text
                  className={`text-white font-bold text-base`}
                  style={{ color: "white" }}
                >
                  {item.title}
                </Text>
                <Text
                  className={`text-white font-bold text-base`}
                  style={{ color: "white" }}
                >
                  {`${item.chapters.length!} chapters`}
                </Text>
              </View>
              <View>
                <Text
                  className={`text-white font-bold text-base`}
                  style={{ color: "white" }}
                >
                  {`₹ ${item.price!}`}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
};