import { router } from "expo-router";

import { images } from "@/constants";
import { setCompany } from "@/core/store/company";
import { Pressable, View, Text, ImageBackground } from "@/ui";

import type { Company } from "@/types";

interface CompanyCardProps {
  item: Company;
}

export const CompanyCard = ({ item }: CompanyCardProps) => {
  const onPress = () => {
    setCompany({ companyId: item.id });
    router.push(`/(auth)/(companies)/${item.id}`);
  };
  return (
    <View key={item.id} className="w-full">
      <Pressable
        onPress={onPress}
        className="w-full flex flex-row my-2 gap-x-2"
      >
        <View className="rounded-xl relative w-12">
          <ImageBackground
            source={item.logo_url || images.onboarding1}
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
            <View className="w-12 h-12 rounded-lg"></View>
          </ImageBackground>
        </View>
        <View className="relative w-9/12 flex flex-row justify-between">
          <View className="flex flex-col">
            <View>
              <Text className="text-xl font-bold">{item.name}</Text>
            </View>
            <View>
              <Text className="text-base font-semibold">{item?.industry}</Text>
            </View>
            <View>
              <Text className="text-xs">{`${item.location!}`}</Text>
            </View>
          </View>
          <View>
            <Text
              className={`text-black font-bold text-base`}
              style={{ color: "black" }}
            >
              {`${item.careers.length!}`}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
