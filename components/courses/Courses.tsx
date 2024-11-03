import { List } from "@/ui";

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
    <List
      data={courses}
      renderItem={({ item, index }) => <CourseCardView item={item} />}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No courses found" loading={loading} />
      )}
      estimatedItemSize={10}
    />
  );
};

interface RecentCoursesProps {
  courses: Course[];
  loading: string;
}

export const RecentCourses = ({ courses, loading }: RecentCoursesProps) => {
  return (
    <List
      data={courses}
      renderItem={({ item }) => <CourseCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingHorizontal: 16,
      }}
      ListEmptyComponent={() => (
        <EmptyCard title="No courses found" loading={loading} isImage={true} />
      )}
      estimatedItemSize={10}
    />
  );
};
