import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { ContentList } from "@/components/ContentList";
import { CourseDetail } from "@/components/CourseDetail";
import CourseLayout from "@/components/CourseLayout";
import CustomButton from "@/components/CustomButton";
import { useCourse } from "@/core/store/course";

const CourseView = () => {
  const courseid = useCourse((state) => state.courseid);
  const course = useCourse((state) => state.course);
  const getCourse = useCourse((state) => state.getCourse);
  const status = useCourse((state) => state.status);
  useEffect(() => {
    if (courseid) {
      getCourse();
    }
  }, [courseid, getCourse]);

  return (
    <>
      {status !== "pending" && course ? (
        <CourseLayout data-id={course.id}>
          <View className="flex flex-col mx-2">
            <View className="self-center">
              <Text className="text-xs font-semibold -mt-10 rounded-2xl p-2 bg-blue-100 text-blue-500">
                {course.category?.name}
              </Text>
            </View>
            <View className="">
              <Text className="text-3xl font-black text-gray-600">
                {course.title}
              </Text>
            </View>
          </View>
          <ContentList
            ListHeaderComponent={<CourseDetail course={course} />}
            onPress="CourseDetail"
          />
          <CustomButton
            title="Buy Now"
            className="mt-5 mx-2 absolute bottom-14 h-[60px]"
          />
        </CourseLayout>
      ) : (
        <View className="w-full h-full flex flex-row justify-center items-center bg-white">
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </>
  );
};

export default CourseView;
