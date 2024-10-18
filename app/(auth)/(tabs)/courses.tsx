import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Categories } from "@/components/Categories";
import { FeaturedCourses, RecentCourses } from "@/components/Courses";
import { Filter } from "@/components/Filter";
import { Loader } from "@/components/Loader";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCategories } from "@/core/store/categories";
import { useCourses } from "@/core/store/courses";

const Courses = () => {
  const colorScheme = useColorScheme();
  const courses = useCourses((state) => state.courses);
  const loading = useCourses((state) => state.status);
  const categories = useCategories((state) => state.categories);
  const isPending = useCategories((state) => state.status);
  const [durations, setDurations] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<boolean>(false);
  const [sortCalendar, setSortCalendar] = useState<boolean>(false);
  const [sortAlphabetic, setSortAlphabetic] = useState(false);
  const [sortClock, setSortClock] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setDurations([
      "3-8 Hours",
      "8-14 Hours",
      "14-20 Hours",
      "20-24 Hours",
      "24-30 Hours",
    ]);
  }, [setDurations]);

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
            className="w-full px-5 my-2"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedView
              className="w-full flex flex-row items-center justify-between"
              lightColor="transparent"
              darkColor="black"
            >
              <ThemedText className="text-3xl font-extrabold">
                Find Your Courses
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <SearchBar
            onPress={handleOpenPress}
            placeholder="Search Your Course"
          />
          <ThemedView
            className="w-full px-5 flex flex-row items-center justify-between"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedText className="text-2xl font-bold">
              Popular Courses
            </ThemedText>
            <Pressable>
              <ThemedText className="text-xs font-bold text-green-500">
                See all
              </ThemedText>
            </Pressable>
          </ThemedView>
          <FeaturedCourses courses={courses} loading={loading} />
          <ThemedView
            className="w-full px-5 flex flex-row items-center justify-between"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedText className="text-2xl font-bold mb-2">
              Categories
            </ThemedText>
            <Pressable onPress={() => setFilterCategories((prev) => !prev)}>
              <MaterialCommunityIcons
                name={
                  filterCategories
                    ? "sort-alphabetical-ascending"
                    : "sort-alphabetical-descending"
                }
                size={24}
                color={colorScheme === "light" ? "black" : "white"}
              />
            </Pressable>
          </ThemedView>
          <Categories categories={categories} loading={isPending} />
          <ThemedView
            className="w-full px-5 flex flex-row items-center justify-between"
            lightColor="transparent"
            darkColor="black"
          >
            <ThemedText className="text-2xl font-bold mb-3">
              Recent Courses
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
          <RecentCourses courses={courses} loading={loading} />
          <Filter
            ref={bottomSheetRef}
            categories={categories}
            handleClosePress={handleClosePress}
            durations={durations}
          />
        </SafeAreaView>
      )}
    </ThemedView>
  );
};

export default Courses;
