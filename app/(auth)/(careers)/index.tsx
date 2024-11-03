import { useColorScheme } from "nativewind";
import { useState } from "react";

import { BackButton } from "@/components";
import {
  View,
  Text,
  Pressable,
  MaterialCommunityIcons,
  SafeAreaView,
} from "@/ui";

const CareersView = () => {
  const { colorScheme } = useColorScheme();
  const [sortCalendar, setSortCalendar] = useState<boolean>(false);
  const [sortAlphabetic, setSortAlphabetic] = useState<boolean>(false);
  const [sortClock, setSortClock] = useState<boolean>(false);

  return (
    <View>
      <SafeAreaView>
        <View className="w-full flex flex-row items-center justify-between p-2">
          <BackButton />
          <Text className="text-2xl font-bold mb-3">Recent Careers</Text>
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
      </SafeAreaView>
    </View>
  );
};

export default CareersView;
