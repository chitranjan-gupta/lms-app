import { View, Text } from "@/ui";

interface ChapterListCardProps {
  title: string;
  numberoflectures: number;
  duration: number;
}

export const ChapterListCard = ({
  title,
  numberoflectures,
  duration,
}: ChapterListCardProps) => {
  return (
    <View className="w-full h-[60px] flex flex-col">
      <View className="flex flex-row gap-x-2 items-center">
        <Text className="font-bold text-base">Chapter:</Text>
        <Text className="font-semibold text-base">{title}</Text>
      </View>
      <View className="flex flex-row gap-x-2">
        <Text className="text-gray-400 text-xs">{`${numberoflectures} Lectures`}</Text>
        <Text className="text-gray-400 text-xs">.</Text>
        <Text className="text-gray-400 text-xs">{`${duration} min`}</Text>
      </View>
    </View>
  );
};
