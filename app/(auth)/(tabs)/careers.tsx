import { router } from "expo-router";
import { useColorScheme } from "nativewind";

import {
  RecentCompanies,
  RecentCareers,
  Loader,
  MockSearchBar,
} from "@/components";
import { useCareers } from "@/core/store/career";
import { useCompanies } from "@/core/store/company";
import { shadowStyle } from "@/styles";
import { Pressable, SafeAreaView, Text, View, FocusAwareStatusBar } from "@/ui";

const Careers = () => {
  const { colorScheme } = useColorScheme();
  const { companies, status: loading } = useCompanies();
  const { careers, status: isPending } = useCareers();

  const handlePress = () => {
    router.push("/(auth)/(search)/career");
  };

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      {loading === "pending" && isPending === "pending" ? (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      ) : (
        <SafeAreaView className="w-full h-full">
          <View className="w-full px-5">
            <View className="w-full flex flex-row items-center justify-between my-2">
              <Text className="text-3xl font-extrabold">Find Your Careers</Text>
            </View>
          </View>
          <MockSearchBar
            onPress={handlePress}
            placeholder="Search Your Career"
          />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-3">Recent Companies</Text>
            <View className="flex flex-row">
              <Pressable onPress={() => router.push("/(auth)/(companies)")}>
                <Text className="text-xs font-bold mb-3 !text-green-500">
                  See all
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="w-full h-1/4">
            <RecentCompanies companies={companies} loading={loading} />
          </View>
          <RecentCareers
            careers={careers}
            loading={isPending}
            headerComponent={
              <View className="w-full">
                <View className="w-full">
                  <Text className="text-2xl font-bold">Filter Career</Text>
                  <View className="flex flex-row flex-wrap gap-x-3 gap-y-3 w-full">
                    <View
                      className="w-[175px] h-[80px] bg-violet-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        Remote Careers
                      </Text>
                    </View>
                    <View
                      className="w-[175px] h-[80px] bg-pink-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        Full Time
                      </Text>
                    </View>
                    <View
                      className="w-[175px] h-[80px] bg-blue-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        On site Careers
                      </Text>
                    </View>
                    <View
                      className="w-[175px] h-[80px] bg-green-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        Part Time
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="w-full flex flex-row items-center justify-between">
                  <Text className="text-2xl font-bold mb-3">
                    Recent Careers
                  </Text>
                  <Pressable onPress={() => router.push("/(auth)/(careers)")}>
                    <Text className="text-xs font-bold mb-3 !text-green-500">
                      See all
                    </Text>
                  </Pressable>
                </View>
              </View>
            }
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Careers;
