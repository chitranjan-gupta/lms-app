import { useMemo } from "react";
import { SectionList } from "react-native";

import { ChapterListCard } from "@/components/ChapterListCard";
import { LectureListCard } from "@/components/LectureListCard";
import { useCourse } from "@/core/store/course";
import { useUser } from "@/core/store/user";

import type { ComponentType, JSXElementConstructor, ReactElement } from "react";

interface ContentListProps {
  ListHeaderComponent:
    | ComponentType<any>
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined;
  onPress: string;
}

export const ContentList = ({
  ListHeaderComponent,
  onPress,
}: ContentListProps) => {
  const course = useCourse((state) => state.course);
  const isPurchased = useUser((state) => state.isPurchased);

  const sections = useMemo(() => {
    if (course?.chapters) {
      return course.chapters.map((chapter) => ({
        ...chapter,
        data: chapter.lectures,
      }));
    }
    return [];
  }, [course]);

  return (
    <SectionList
      sections={sections!}
      keyExtractor={(item, index) => index.toString()}
      className="mx-2 mb-[100px]"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <LectureListCard
          item={item}
          onPress={onPress}
          isPurchased={isPurchased}
        />
      )}
      renderSectionHeader={({ section: { title, duration, lectures } }) => (
        <ChapterListCard
          title={title}
          duration={duration}
          numberoflectures={lectures.length}
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};
