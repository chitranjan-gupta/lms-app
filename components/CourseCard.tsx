import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { setCourse } from "@/core/store/course";
import { Course } from "@/types/type";

import { ThemedText } from "./ThemedText";

export const CourseCard = ({ item }: { item: Course }) => {
  const onPress = () => {
    setCourse({ courseId: item.id });
    router.push(`/(auth)/(courses)`);
  };
  return (
    <ThemedView
      key={item.id}
      className="w-full"
      lightColor="transparent"
      darkColor="black"
    >
      <Pressable
        onPress={onPress}
        className="w-full flex flex-row my-2 gap-x-2"
      >
        <ThemedView
          className="rounded-xl relative w-20 h-20"
          lightColor="transparent"
          darkColor="black"
        >
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
            <ThemedView
              className="w-20 h-20 rounded-lg"
              lightColor="transparent"
              darkColor="transparent"
            ></ThemedView>
          </ImageBackground>
        </ThemedView>
        <ThemedView
          className="relative w-9/12 flex flex-row justify-between"
          lightColor="transparent"
          darkColor="black"
        >
          <ThemedView
            className="flex flex-col"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedView lightColor="transparent" darkColor="black">
              <ThemedText className="text-xl font-bold">
                {item.title}
              </ThemedText>
            </ThemedView>
            <ThemedView lightColor="transparent" darkColor="black">
              <ThemedText className="text-base font-semibold">
                {item?.category?.name!}
              </ThemedText>
            </ThemedView>
            <ThemedView lightColor="transparent" darkColor="black">
              <ThemedText className="text-xs">{`${item.chapters.length!} chapters`}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView lightColor="transparent" darkColor="black">
            <ThemedText
              className={`text-black font-bold text-base`}
              style={{ color: "black" }}
            >
              {`₹ ${item.price!}`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};
