import { Image } from "expo-image";
import { useColorScheme } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { images } from "@/constants";
import { Course } from "@/types/type";

export const CourseDetail = ({ course }: { course: Course }) => {
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      className="w-full mb-5"
      lightColor="transparent"
      darkColor="transparent"
    >
      <ThemedView
        className="border-b-2 border-gray-300 pb-3"
        lightColor="transparent"
        darkColor="transparent"
      >
        <ThemedText className=" text-gray-400">Description</ThemedText>
        <RichEditor
          initialContentHTML={course?.description}
          disabled={true}
          style={{
            backgroundColor: colorScheme === "light" ? "white" : "black",
          }}
        />
      </ThemedView>
      {course.User ? (
        <ThemedView lightColor="transparent" darkColor="transparent">
          <ThemedText className="text-gray-400">Author</ThemedText>
          <ThemedView className="flex flex-row w-full items-center justify-start p-2 bg-gray-100 rounded-2xl">
            <ThemedView
              className="rounded-full ml-3"
              lightColor="transparent"
              darkColor="transparent"
            >
              <Image
                source={images.onboarding2}
                className="w-[70px] h-[70px] rounded-full"
              />
            </ThemedView>
            <ThemedView
              className="flex flex-col ml-5"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedText className="font-bold">Bill</ThemedText>
              <ThemedView
                className="flex flex-row justify-start items-center gap-x-2"
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText className="text-gray-400">14 Courses</ThemedText>
                <ThemedText className="font-black text-gray-400 text-xl text-center w-5 h-8 flex flex-row justify-center items-center">
                  .
                </ThemedText>
                <ThemedText className="text-gray-400">1400 Students</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ) : (
        <></>
      )}
      {/* <ThemedView className="flex flex-row mt-3 gap-x-6">
        <ThemedView className="bg-orange-500 w-[50px] p-2 rounded-xl flex flex-row justify-center items-center">
          <ThemedText className="text-white">4.3</ThemedText>
        </ThemedView>
        <ThemedView className="bg-orange-500 w-[50px] p-2 rounded-xl flex flex-row justify-center items-center">
          <ThemedText className="text-white">4.3</ThemedText>
        </ThemedView>
        <ThemedView className="bg-orange-500 w-[50px] p-2 rounded-xl flex flex-row justify-center items-center">
          <ThemedText className="text-white">4.3</ThemedText>
        </ThemedView>
      </ThemedView> */}
      <ThemedView
        className="mt-5"
        lightColor="transparent"
        darkColor="transparent"
      >
        <Image
          source={course?.imageUrl}
          className="w-full h-[200px] rounded-2xl"
        />
      </ThemedView>
      <ThemedView
        className="mt-5 ml-5"
        lightColor="transparent"
        darkColor="transparent"
      >
        <ThemedText className="font-black text-2xl">{`₹${course?.price}`}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};
