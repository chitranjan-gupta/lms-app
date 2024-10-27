import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
// import { useTranslation } from "react-i18next";

import {
  FeaturedCompanies,
  RecentJobs,
  Loader,
  MockSearchBar,
} from "@/components";
import { useCompanies } from "@/core/store/companies";
import { useJobs } from "@/core/store/jobs";
import { shadowStyle } from "@/styles";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  MaterialCommunityIcons,
  FocusAwareStatusBar,
} from "@/ui";

const Jobs = () => {
  const { colorScheme } = useColorScheme();
  // const { t } = useTranslation();
  const [sortCalendar, setSortCalendar] = useState<boolean>(false);
  const [sortAlphabetic, setSortAlphabetic] = useState<boolean>(false);
  const [sortClock, setSortClock] = useState<boolean>(false);
  const companies = useCompanies((state) => state.companies);
  const loading = useCompanies((state) => state.status);
  const jobs = useJobs((state) => state.jobs);
  const isPending = useJobs((state) => state.status);

  const handlePress = () => {
    router.push("/(search)");
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
              <Text className="text-3xl font-extrabold">Find Your Jobs</Text>
            </View>
          </View>
          <MockSearchBar onPress={handlePress} placeholder="Search Your Job" />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-3">Popular Companies</Text>
            <View className="flex flex-row">
              <Pressable>
                <Text className="text-xs font-bold mb-3 text-green-500">
                  See all
                </Text>
              </Pressable>
            </View>
          </View>
          <FeaturedCompanies companies={companies} loading={loading} />
          <RecentJobs
            jobs={jobs}
            loading={isPending}
            headerComponent={
              <View className="w-full">
                <View className="w-full">
                  <Text className="text-2xl font-bold">Filter Job</Text>
                  <View className="flex flex-row flex-wrap gap-x-3 gap-y-3 w-full">
                    <View
                      className="w-[170px] h-[80px] bg-violet-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        Remote Jobs
                      </Text>
                    </View>
                    <View
                      className="w-[170px] h-[80px] bg-pink-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        Full Time
                      </Text>
                    </View>
                    <View
                      className="w-[170px] h-[80px] bg-blue-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        On site Jobs
                      </Text>
                    </View>
                    <View
                      className="w-[170px] h-[80px] bg-green-500 rounded-lg flex flex-row justify-center items-center"
                      style={shadowStyle.shadowSmall}
                    >
                      <Text className="text-base text-center text-white">
                        Part Time
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="w-full flex flex-row items-center justify-between">
                  <Text className="text-2xl font-bold mb-3">Recent Jobs</Text>
                  <View className="flex flex-row">
                    <Pressable onPress={() => setSortCalendar((prev) => !prev)}>
                      <MaterialCommunityIcons
                        name={
                          sortCalendar
                            ? "sort-calendar-ascending"
                            : "sort-calendar-descending"
                        }
                        size={24}
                        color={colorScheme === "light" ? "black" : "white"}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => setSortAlphabetic((prev) => !prev)}
                    >
                      <MaterialCommunityIcons
                        name={
                          sortAlphabetic
                            ? "sort-alphabetical-ascending"
                            : "sort-alphabetical-descending"
                        }
                        size={24}
                        color={colorScheme === "light" ? "black" : "white"}
                      />
                    </Pressable>
                    <Pressable onPress={() => setSortClock((prev) => !prev)}>
                      <MaterialCommunityIcons
                        name={
                          sortClock
                            ? "sort-clock-ascending"
                            : "sort-clock-descending"
                        }
                        size={24}
                        color={colorScheme === "light" ? "black" : "white"}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            }
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Jobs;
