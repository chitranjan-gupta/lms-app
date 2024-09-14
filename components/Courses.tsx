import { FlatList } from "react-native";

import { CourseCard } from "@/components/CourseCard";
import { CourseCardView } from "@/components/CourseCardView";
import { EmptyCard } from "@/components/EmptyCard";
import { Course } from "@/types/type";

export const Courses = ({
  courses,
  loading,
}: {
  courses: Course[];
  loading: string;
}) => {
  return (
    <FlatList
      data={courses}
      renderItem={({ item, index }) => <CourseCardView item={item} />}
      style={{
        height: 270,
        flexGrow: 0,
      }}
      keyExtractor={(item, index) => index.toString()}
      className="px-5 w-full"
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No courses found" loading={loading} />
      )}
    />
  );
};

export const RecentCourses = ({
  courses,
  loading,
}: {
  courses: Course[];
  loading: string;
}) => {
  return (
    <FlatList
      data={courses}
      renderItem={({ item }) => <CourseCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      className="px-5"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      ListEmptyComponent={() => (
        <EmptyCard title="No courses found" loading={loading} isImage={true} />
      )}
    />
  );
};
