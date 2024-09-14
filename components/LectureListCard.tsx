// import AntDesign from "@expo/vector-icons/AntDesign";
// import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable, View, Text } from "react-native";

import { setChapter } from "@/core/store/chapter";
import { setLecture } from "@/core/store/lecture";
import { Lecture } from "@/types/type";

export const LectureListCard = ({
  item,
  onPress,
}: {
  item: Lecture;
  onPress: string;
}) => {
  return (
    <View className="w-full ml-2 h-[60px]">
      <Pressable
        onPress={
          onPress === "CourseDetail"
            ? () => {
                if (item.isFree) {
                  setChapter(item.chapterId);
                  setLecture(item.id);
                  router.push(`/(auth)/(courses)/(lectures)`);
                }
              }
            : () => {
                if (item.isFree) {
                  setChapter(item.chapterId);
                  setLecture(item.id);
                }
              }
        }
      >
        <View className="w-full flex flex-row justify-between">
          <View className="flex flex-row gap-x-5 w-10/12">
            <View>
              <Text className="text-2xl font-black text-gray-400">01</Text>
            </View>
            <View className="w-10/12">
              <View className="flex flex-row gap-x-2">
                <Text className="font-bold text-sm">Lecture:</Text>
                <Text
                  className="font-semibold w-9/12"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
              </View>
              <View className="flex flex-row gap-x-2">
                <Text className="text-orange-500">{item.duration}</Text>
                <Text className="text-orange-500">mins</Text>
              </View>
            </View>
          </View>
          <View
            className={`mr-2 ${item.isFree ? "bg-blue-500" : "bg-blue-100"} rounded-full w-[50px] h-[50px] flex flex-row items-center justify-center`}
          >
            {/* <Entypo name="controller-play" size={24} color="white" /> */}
            {/* <AntDesign name="pause" size={24} color="white" /> */}
            {item.isFree ? (
              <Feather name="unlock" size={24} color="white" />
            ) : (
              <Feather name="lock" size={24} color="white" />
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};
