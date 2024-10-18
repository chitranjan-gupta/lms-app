import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FeaturedCompanies } from "@/components/Companies";
import { Filter } from "@/components/Filter";
import { RecentJobs } from "@/components/Jobs";
import { Loader } from "@/components/Loader";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCompanies } from "@/core/store/companies";
import { useJobs } from "@/core/store/jobs";
import { shadowStyle } from "@/styles";

const Jobs = () => {
  const colorScheme = useColorScheme();
  const [sortCalendar, setSortCalendar] = useState<boolean>(false);
  const [sortAlphabetic, setSortAlphabetic] = useState<boolean>(false);
  const [sortClock, setSortClock] = useState<boolean>(false);

  const companies = useCompanies((state) => state.companies);
  const loading = useCompanies((state) => state.status);
  const jobs = useJobs((state) => state.jobs);
  const isPending = useJobs((state) => state.status);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  return (
    <ThemedView className="w-full h-full" lightColor="white" darkColor="black">
      {loading === "pending" && isPending === "pending" ? (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      ) : (
        <SafeAreaView className="w-full h-full">
          <ThemedView
            className="w-full px-5"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedView
              className="w-full flex flex-row items-center justify-between my-2"
              lightColor="transparent"
              darkColor="black"
            >
              <ThemedText className="text-3xl font-extrabold">
                Find Your Jobs
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <SearchBar onPress={handleOpenPress} placeholder="Search Your Job" />
          <ThemedView
            className="w-full px-5 flex flex-row items-center justify-between"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedText className="text-2xl font-bold mb-3">
              Popular Companies
            </ThemedText>
            <ThemedView
              className="flex flex-row"
              lightColor="transparent"
              darkColor="black"
            >
              <Pressable>
                <ThemedText className="text-xs font-bold mb-3 text-green-500">
                  See all
                </ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
          <FeaturedCompanies companies={companies} loading={loading} />
          <ThemedView lightColor="transparent" darkColor="transparent">
            <ThemedText className="text-2xl font-bold px-5">
              Filter Job
            </ThemedText>
            <ThemedView
              className="flex flex-row flex-wrap gap-x-3 gap-y-3 px-5"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedView
                className="w-[170px] h-[80px] bg-violet-500 rounded-lg flex flex-row justify-center items-center"
                style={shadowStyle.shadowSmall}
              >
                <ThemedText className="text-base text-center text-white">
                  Remote Jobs
                </ThemedText>
              </ThemedView>
              <ThemedView
                className="w-[170px] h-[80px] bg-pink-500 rounded-lg flex flex-row justify-center items-center"
                style={shadowStyle.shadowSmall}
              >
                <ThemedText className="text-base text-center text-white">
                  Full Time
                </ThemedText>
              </ThemedView>
              <ThemedView
                className="w-[170px] h-[80px] bg-blue-500 rounded-lg flex flex-row justify-center items-center"
                style={shadowStyle.shadowSmall}
              >
                <ThemedText className="text-base text-center text-white">
                  On site Jobs
                </ThemedText>
              </ThemedView>
              <ThemedView
                className="w-[170px] h-[80px] bg-green-500 rounded-lg flex flex-row justify-center items-center"
                style={shadowStyle.shadowSmall}
              >
                <ThemedText className="text-base text-center text-white">
                  Part Time
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView
            className="w-full px-5 flex flex-row items-center justify-between"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedText className="text-2xl font-bold mb-3">
              Recent Jobs
            </ThemedText>
            <ThemedView
              className="flex flex-row"
              lightColor="transparent"
              darkColor="black"
            >
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
            </ThemedView>
          </ThemedView>
          <RecentJobs jobs={jobs} loading={isPending} />
          <Filter ref={bottomSheetRef} handleClosePress={handleClosePress} />
        </SafeAreaView>
      )}
    </ThemedView>
  );
};

export default Jobs;
