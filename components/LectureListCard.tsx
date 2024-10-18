import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { setChapter } from "@/core/store/chapter";
import { setLecture, useLecture } from "@/core/store/lecture";
import { Lecture } from "@/types/type";

export const LectureListCard = ({
  item,
  onPress,
  isPurchased,
}: {
  item: Lecture;
  onPress: string;
  isPurchased: string;
}) => {
  const currentPlaying = useLecture((store) => store.lectureid);
  return (
    <ThemedView
      className="w-full ml-2 h-[60px]"
      lightColor="transparent"
      darkColor="transparent"
    >
      <Pressable
        onPress={
          onPress === "CourseDetail"
            ? () => {
                if (item.isFree || isPurchased === item.courseId) {
                  setChapter(item.chapterId);
                  setLecture(item.id);
                  router.push(`/(auth)/(courses)/(lectures)`);
                }
              }
            : () => {
                if (item.isFree || isPurchased === item.courseId) {
                  setChapter(item.chapterId);
                  setLecture(item.id);
                }
              }
        }
      >
        <ThemedView
          className="w-full flex flex-row justify-between"
          lightColor="transparent"
          darkColor="transparent"
        >
          <ThemedView
            className="flex flex-row gap-x-5 w-10/12"
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView lightColor="transparent" darkColor="transparent">
              <ThemedText className="text-2xl font-black text-gray-400">
                01
              </ThemedText>
            </ThemedView>
            <ThemedView
              className="w-10/12"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedView
                className="flex flex-row gap-x-2"
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText className="font-bold text-sm">Lecture:</ThemedText>
                <ThemedText
                  className="font-semibold w-9/12"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </ThemedText>
              </ThemedView>
              <ThemedView
                className="flex flex-row gap-x-2"
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText className="text-orange-500">
                  {item.duration}
                </ThemedText>
                <ThemedText className="text-orange-500">mins</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView
            className={`mr-2 ${item.isFree || isPurchased === item.courseId ? "bg-blue-500" : "bg-blue-100"} rounded-full w-[50px] h-[50px] flex flex-row items-center justify-center`}
          >
            {isPurchased === item.courseId && currentPlaying !== item.id ? (
              <Entypo name="controller-play" size={24} color="white" />
            ) : (
              <></>
            )}

            {isPurchased === item.courseId && currentPlaying === item.id ? (
              <AntDesign name="pause" size={24} color="white" />
            ) : (
              <></>
            )}

            {item.isFree && isPurchased !== item.courseId ? (
              <Feather name="unlock" size={24} color="white" />
            ) : (
              <></>
            )}

            {!item.isFree && isPurchased !== item.courseId ? (
              <Feather name="lock" size={24} color="white" />
            ) : (
              <></>
            )}
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};
