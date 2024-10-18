import { ImageBackground } from "expo-image";
import { Pressable } from "react-native";

import { Job } from "@/types/type";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export const JobCardView = ({ item }: { item: Job }) => {
  return (
    <ThemedView
      className="mx-2 rounded-xl bg-violet-300 w-[150px] h-[200px]"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
      }}
    >
      <Pressable className="rounded-xl">
        <ThemedView
          key={item.$id}
          className={`w-full h-full rounded-xl flex flex-col justify-start items-center p-5`}
        >
          <ThemedView>
            <ImageBackground
              source={item?.company.logo_url!}
              className="rounded-xl w-[48px] h-[48px]"
              style={{ borderRadius: 12 }}
              imageStyle={{ borderRadius: 12 }}
            ></ImageBackground>
          </ThemedView>
          <ThemedView className="h-[50px] flex flex-col justify-start items-center w-full gap-y-2">
            <ThemedView className="flex flex-col items-center">
              <ThemedText
                className={`text-black font-black text-xl`}
                style={{ color: "black" }}
              >
                {item?.title!}
              </ThemedText>
            </ThemedView>
            <ThemedView className="flex flex-col items-center">
              <ThemedText
                className={`text-black font-bold text-base`}
                style={{ color: "black" }}
              >
                {item?.company?.industry!}
              </ThemedText>
              <ThemedText
                className={`text-black font-bold text-base`}
                style={{ color: "black" }}
              >
                {`${item.location!}`}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};
