import { router } from "expo-router";

import { images } from "@/constants";
import { setCompany } from "@/core/store/company";
import { Pressable, Text, View, Image } from "@/ui";

import type { Company } from "@/types";

interface CompanyCardViewProps {
  item: Company;
}

export const CompanyCardView = ({ item }: CompanyCardViewProps) => {
  const onPress = () => {
    setCompany({ companyId: item.id });
    router.push(`/(auth)/(companies)/${item.id}`);
  };

  return (
    <View
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
        marginBottom: 20,
      }}
    >
      <Pressable onPress={onPress} className="rounded-xl">
        <View
          key={item.id}
          className={`w-full h-full rounded-xl flex flex-col justify-start items-center p-5`}
        >
          <View className="">
            <Image
              source={item?.logo_url || images.onboarding1}
              className="rounded-xl"
              style={{ borderRadius: 12, width: 48, height: 48 }}
              contentFit="contain"
            />
          </View>
          <View className="h-[50px] flex flex-col justify-start items-center w-full gap-y-2">
            <View className="flex flex-col items-center">
              <Text className={`text-black font-black text-xl`}>
                {item?.name || "Unknown"}
              </Text>
            </View>
            <View className="flex flex-col items-center">
              <Text className={`text-black font-bold text-base`}>
                {item?.industry || ""}
              </Text>
              <Text
                className={`text-black font-bold text-base`}
                style={{ color: "black" }}
              >
                {item?.location || ""}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
