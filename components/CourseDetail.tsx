import { Image } from "expo-image";
import { View, Text } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";

import { images } from "@/constants";
import { Course } from "@/types/type";

export const CourseDetail = ({ course }: { course: Course }) => {
  return (
    <View className="w-full mb-5">
      <View className="border-b-2 border-gray-300 pb-3">
        <Text className=" text-gray-400">Description</Text>
        <RichEditor initialContentHTML={course?.description} disabled={true} />
      </View>
      {course.User ? (
        <View className="">
          <Text className="text-gray-400">Author</Text>
          <View className="flex flex-row w-full items-center justify-start p-2 bg-gray-100 rounded-2xl">
            <View className="rounded-full ml-3">
              <Image
                source={images.onboarding2}
                className="w-[70px] h-[70px] rounded-full"
              />
            </View>
            <View className="flex flex-col ml-5">
              <Text className="font-bold">Bill</Text>
              <View className="flex flex-row justify-start items-center gap-x-2">
                <Text className="text-gray-400">14 Courses</Text>
                <Text className="font-black text-gray-400 text-xl text-center w-5 h-8 flex flex-row justify-center items-center">
                  .
                </Text>
                <Text className="text-gray-400">1400 Students</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {/* <View className="flex flex-row mt-3 gap-x-6">
        <View className="bg-orange-500 w-[50px] p-2 rounded-xl flex flex-row justify-center items-center">
          <Text className="text-white">4.3</Text>
        </View>
        <View className="bg-orange-500 w-[50px] p-2 rounded-xl flex flex-row justify-center items-center">
          <Text className="text-white">4.3</Text>
        </View>
        <View className="bg-orange-500 w-[50px] p-2 rounded-xl flex flex-row justify-center items-center">
          <Text className="text-white">4.3</Text>
        </View>
      </View> */}
      <View className="mt-5">
        <Image
          source={course?.imageUrl}
          className="w-full h-[200px] rounded-2xl"
        />
      </View>
      <View className="mt-5 ml-5">
        <Text className="font-black text-2xl">{`₹${course?.price}`}</Text>
      </View>
    </View>
  );
};
