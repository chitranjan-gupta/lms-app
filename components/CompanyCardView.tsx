import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { setCompany } from "@/core/store/company";
import { Company } from "@/types/type";

export const CompanyCardView = ({ item }: { item: Company }) => {
  const onPress = () => {
    setCompany({ companyId: item.$id });
    router.push("/(auth)/(companies)");
  };

  return (
    <ThemedView
      className="mx-2 rounded-xl bg-yellow-300 w-[150px] h-[200px]"
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
      <Pressable onPress={onPress} className="rounded-xl">
        <ThemedView
          key={item.$id}
          className={`w-full h-full rounded-xl flex flex-col justify-start items-center p-5`}
          lightColor="transparent"
          darkColor="transparent"
        >
          <ThemedView lightColor="transparent" darkColor="transparent">
            <ImageBackground
              source={item.logo_url!}
              className="rounded-xl w-[48px] h-[48px]"
              style={{ borderRadius: 12 }}
              imageStyle={{ borderRadius: 12 }}
            ></ImageBackground>
          </ThemedView>
          <ThemedView
            className="h-[50px] flex flex-col justify-start items-center w-full gap-y-2"
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              className="flex flex-col items-center"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedText
                className={`text-black font-black text-xl`}
                style={{ color: "black" }}
              >
                {item?.name!}
              </ThemedText>
            </ThemedView>
            <ThemedView
              className="flex flex-col items-center"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedText
                className={`text-black font-bold text-base`}
                style={{ color: "black" }}
              >
                {item?.industry!}
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
