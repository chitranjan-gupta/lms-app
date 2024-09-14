import { SectionList } from "react-native";

import { ChapterListCard } from "@/components/ChapterListCard";
import { LectureListCard } from "@/components/LectureListCard";
import { useMemo } from "react";
import type { ComponentType, JSXElementConstructor, ReactElement } from "react";
import { useCourse } from "@/core/store/course";

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
  const sections = useMemo(() => {
    return course?.chapters.map((chapter) => {
      return { ...chapter, data: chapter.lectures };
    });
  }, [course?.chapters!]);

  return (
    <SectionList
      sections={sections!}
      keyExtractor={(item, index) => index.toString()}
      className="mx-2 mb-[100px]"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <LectureListCard item={item} onPress={onPress} />
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
