import { useColorScheme } from "nativewind";
import { useEffect } from "react";

import {
  ContentList,
  CourseDetail,
  CourseLayout,
  Loader,
  Payment,
} from "@/components";
import { useCourse } from "@/core/store/course";
import { useUser } from "@/core/store/user";
import { FocusAwareStatusBar, Text, View } from "@/ui";

const CourseView = () => {
  const { colorScheme } = useColorScheme();
  const { user, isPurchased, getPurchase } = useUser();
  const { courseid, course, getCourse, status } = useCourse();

  useEffect(() => {
    if (courseid && (user as any).userId) {
      getCourse();
      getPurchase(courseid);
    }
  }, [courseid, getCourse, user, getPurchase]);

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      {status !== "pending" && course ? (
        <CourseLayout>
          <View className="flex flex-col mx-2">
            <View className="self-center">
              <Text className="text-xs font-semibold -mt-10 rounded-2xl p-2 bg-blue-100 !text-blue-500">
                {course?.category?.name}
              </Text>
            </View>
            <View>
              <Text className="text-3xl font-black !text-gray-600">
                {course?.title}
              </Text>
            </View>
          </View>
          <ContentList
            ListHeaderComponent={<CourseDetail course={course} />}
            onPress="CourseDetail"
          />
          {isPurchased !== courseid && (
            <Payment courseid={course.id} price={course.price} />
          )}
        </CourseLayout>
      ) : (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      )}
    </View>
  );
};

export default CourseView;
