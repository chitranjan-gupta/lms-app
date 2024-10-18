import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export const ChapterListCard = ({
  title,
  numberoflectures,
  duration,
}: {
  title: string;
  numberoflectures: number;
  duration: number;
}) => {
  return (
    <ThemedView
      className="w-full h-[60px] flex flex-col"
      lightColor="transparent"
      darkColor="transparent"
    >
      <ThemedView
        className="flex flex-row gap-x-2 items-center"
        lightColor="transparent"
        darkColor="transparent"
      >
        <ThemedText className="font-bold text-base">Chapter:</ThemedText>
        <ThemedText className="font-semibold text-base">{title}</ThemedText>
      </ThemedView>
      <ThemedView
        className="flex flex-row gap-x-2"
        lightColor="transparent"
        darkColor="transparent"
      >
        <ThemedText className="text-gray-400 text-xs">{`${numberoflectures} Lectures`}</ThemedText>
        <ThemedText className="text-gray-400 text-xs">.</ThemedText>
        <ThemedText className="text-gray-400 text-xs">{`${duration} min`}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};
