import { Image } from "expo-image";
import { View, Text, ActivityIndicator } from "react-native";

import { images } from "@/constants";

export const EmptyCard = ({
  loading,
  title,
  isImage,
  imageUrl,
}: {
  loading: string;
  title: string;
  isImage?: boolean;
  imageUrl?: string;
}) => {
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
        <ActivityIndicator size="small" color="#000" />
      )}
    </View>
  );
};
