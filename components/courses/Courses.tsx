import { FlatList } from "@/ui";

import { EmptyCard } from "../EmptyCard";

import { CourseCard } from "./CourseCard";
import { CourseCardView } from "./CourseCardView";

import type { Course } from "@/types";

interface FeaturedCoursesProps {
  courses: Course[];
  loading: string;
}

export const FeaturedCourses = ({ courses, loading }: FeaturedCoursesProps) => {
  return (
    <FlatList
      data={courses}
      renderItem={({ item, index }) => <CourseCardView item={item} />}
      style={{
        height: 280,
        flexGrow: 0,
        marginTop: 5,
      }}
      keyExtractor={(item, index) => index.toString()}
      className="px-4 w-full"
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No courses found" loading={loading} />
      )}
    />
  );
};

interface RecentCoursesProps {
  courses: Course[];
  loading: string;
}

export const RecentCourses = ({ courses, loading }: RecentCoursesProps) => {
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
