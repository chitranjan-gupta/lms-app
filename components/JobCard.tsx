import { ImageBackground } from "expo-image";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Job } from "@/types/type";

export const JobCard = ({ item }: { item: Job }) => {
  return (
    <ThemedView key={item.$id} className="w-full">
      <Pressable className="w-full flex flex-row my-2 gap-x-2">
        <ThemedView className="rounded-xl relative w-12">
          <ImageBackground
            source={item?.company?.logo_url!}
            className="rounded-xl"
            alt={item?.company?.name}
            style={{
              borderRadius: 12,
            }}
            imageStyle={{ borderRadius: 12 }}
          >
            <ThemedView className="w-12 h-12 rounded-lg"></ThemedView>
          </ImageBackground>
        </ThemedView>
        <ThemedView className="relative w-9/12 flex flex-row justify-between">
          <ThemedView className="flex flex-col">
            <ThemedView>
              <ThemedText className="text-xl font-bold">
                {item?.title}
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText className="text-base font-semibold">
                {item?.sector_type}
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText className="text-xs">{`${item?.company.name!}`}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView>
            <ThemedText
              className={`text-black font-bold text-base`}
              style={{ color: "black" }}
            >
              {`${item.location!}`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};
