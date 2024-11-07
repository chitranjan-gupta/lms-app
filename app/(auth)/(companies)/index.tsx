import { useColorScheme } from "nativewind";
import { useState } from "react";

import { BackButton, CompaniesList } from "@/components";
import { useCompanies } from "@/core/store/company";
import {
  View,
  Text,
  Pressable,
  MaterialCommunityIcons,
  SafeAreaView,
} from "@/ui";

const CompaniesView = () => {
  const { colorScheme } = useColorScheme();
  const { companies, status, getCompanies, moreCompanies } = useCompanies();
  const [sortCalendar, setSortCalendar] = useState<boolean>(false);
  const [sortAlphabetic, setSortAlphabetic] = useState<boolean>(false);
  const [sortClock, setSortClock] = useState<boolean>(false);

  const onRefresh = async () => {
    await getCompanies();
  };

  const onEndReached = async () => {
    await moreCompanies();
  };

  return (
    <View>
      <SafeAreaView className="w-full h-full">
        <View className="w-full flex flex-row items-center justify-between p-2">
          <BackButton />
          <Text className="text-2xl font-bold mb-3">Recent Companies</Text>
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
            <Pressable onPress={() => setSortAlphabetic((prev) => !prev)}>
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
                  sortClock ? "sort-clock-ascending" : "sort-clock-descending"
                }
                size={24}
                color={colorScheme === "light" ? "black" : "white"}
              />
            </Pressable>
          </View>
        </View>
        <View className="w-full h-full p-2">
          <CompaniesList
            companies={companies}
            loading={status}
            refreshing={status === "pending" ? true : false}
            onRefresh={onRefresh}
            onEndReached={onEndReached}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CompaniesView;
