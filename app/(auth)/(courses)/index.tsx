import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { ContentList } from "@/components/ContentList";
import { CourseDetail } from "@/components/CourseDetail";
import CourseLayout from "@/components/CourseLayout";
import { Loader } from "@/components/Loader";
import Payment from "@/components/Payment";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCourse } from "@/core/store/course";
import { useUser } from "@/core/store/user";

const CourseView = () => {
  const colorScheme = useColorScheme();
  const user = useUser((state) => state.user);
  const isPurchased = useUser((state) => state.isPurchased);
  const getPurchase = useUser((state) => state.getPurchase);
  const courseid = useCourse((state) => state.courseid);
  const course = useCourse((state) => state.course);
  const getCourse = useCourse((state) => state.getCourse);
  const status = useCourse((state) => state.status);

  useEffect(() => {
    if (courseid && (user as any).userId) {
      getCourse();
      getPurchase(courseid);
    }
  }, [courseid, getCourse, user, getPurchase]);

  return (
    <ThemedView lightColor="white" darkColor="black">
      {status !== "pending" && course ? (
        <CourseLayout>
          <ThemedView
            className="flex flex-col mx-2"
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              className="self-center"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedText className="text-xs font-semibold -mt-10 rounded-2xl p-2 bg-blue-100 text-blue-500">
                {course.category?.name}
              </ThemedText>
            </ThemedView>
            <ThemedView lightColor="transparent" darkColor="transparent">
              <ThemedText className="text-3xl font-black text-gray-600">
                {course.title}
              </ThemedText>
            </ThemedView>
          </ThemedView>
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
    </ThemedView>
  );
};

export default CourseView;
