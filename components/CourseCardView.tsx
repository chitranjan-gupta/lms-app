import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { setCourse } from "@/core/store/course";
import { Course } from "@/types/type";

export const CourseCardView = ({ item }: { item: Course }) => {
  const onPress = () => {
    setCourse({ courseId: item.id });
    router.push(`/(auth)/(courses)`);
  };
  return (
    <ThemedView
      className="mx-2 rounded-xl w-[300px] h-[200px]"
      lightColor="transparent"
      darkColor="black"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
      }}
    >
      <ImageBackground
        source={item.imageUrl!}
        className="rounded-xl"
        style={{ borderRadius: 12 }}
        imageStyle={{ borderRadius: 12 }}
      >
        <Pressable onPress={onPress} className="rounded-xl">
          <ThemedView
            key={item.id}
            className={`w-[300px] h-[200px] rounded-xl flex flex-col justify-between items-start p-3`}
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              className="h-[30px] rounded-xl bg-transparent flex flex-row p-1"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedText
                className={`text-white font-bold text-base`}
                style={{ color: "white" }}
              >
                {item?.category?.name!}
              </ThemedText>
            </ThemedView>
            <ThemedView
              className="h-[50px] flex flex-row justify-between w-full"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedView
                className="flex flex-col"
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText
                  className={`text-white font-bold text-base`}
                  style={{ color: "white" }}
                >
                  {item.title}
                </ThemedText>
                <ThemedText
                  className={`text-white font-bold text-base`}
                  style={{ color: "white" }}
                >
                  {`${item.chapters.length!} chapters`}
                </ThemedText>
              </ThemedView>
              <ThemedView lightColor="transparent" darkColor="transparent">
                <ThemedText
                  className={`text-white font-bold text-base`}
                  style={{ color: "white" }}
                >
                  {`₹ ${item.price!}`}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </Pressable>
      </ImageBackground>
    </ThemedView>
  );
};
