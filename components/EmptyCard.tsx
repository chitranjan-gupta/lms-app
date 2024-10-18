import { Image } from "expo-image";
import { ActivityIndicator, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      className="flex flex-col items-center justify-center"
      lightColor="transparent"
      darkColor="transparent"
    >
      {!(loading === "idle") ? (
        <ThemedView>
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
          <ThemedText className="text-sm">{title}</ThemedText>
        </ThemedView>
      ) : (
        <ActivityIndicator
          size="small"
          color={colorScheme === "light" ? "black" : "white"}
        />
      )}
    </ThemedView>
  );
};
