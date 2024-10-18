import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Company } from "@/types/type";

export const CompanyCard = ({ item }: { item: Company }) => {
  const onPress = () => {
    router.push("/(auth)/(companies)");
  };
  return (
    <ThemedView
      key={item.$id}
      className="w-full"
      lightColor="transparent"
      darkColor="black"
    >
      <Pressable
        onPress={onPress}
        className="w-full flex flex-row my-2 gap-x-2"
      >
        <ThemedView className="rounded-xl relative w-12">
          <ImageBackground
            source={item.logo_url!}
            className="rounded-xl"
            alt={item.name}
            style={{
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 5,
            }}
            imageStyle={{ borderRadius: 12 }}
          >
            <ThemedView className="w-12 h-12 rounded-lg"></ThemedView>
          </ImageBackground>
        </ThemedView>
        <ThemedView className="relative w-9/12 flex flex-row justify-between">
          <ThemedView className="flex flex-col">
            <ThemedView>
              <ThemedText className="text-xl font-bold">{item.name}</ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText className="text-base font-semibold">
                {item?.industry}
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText className="text-xs">{`${item.location!}`}</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView>
            <ThemedText
              className={`text-black font-bold text-base`}
              style={{ color: "black" }}
            >
              {`${item.jobs.length!}`}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};
