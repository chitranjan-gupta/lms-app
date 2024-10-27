import { useColorScheme } from "nativewind";

import { images } from "@/constants";
import { Text, View, Image } from "@/ui";

import { Loader } from "./Loader";

interface EmptyCardProps {
  loading: string;
  title: string;
  isImage?: boolean;
  imageUrl?: string;
}

export const EmptyCard = ({
  loading,
  title,
  isImage,
  imageUrl,
}: EmptyCardProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex flex-col items-center justify-center">
      {!(loading === "idle") ? (
        <View>
          {isImage ? (
            <Image
              source={imageUrl || images.noResult}
              className="w-40 h-40"
              alt={title}
              contentFit="contain"
            />
          ) : (
            <></>
          )}
          <Text className="text-sm">{title}</Text>
        </View>
      ) : (
        <Loader
          variant="small"
          color={colorScheme === "light" ? "black" : "white"}
        />
      )}
    </View>
  );
};
