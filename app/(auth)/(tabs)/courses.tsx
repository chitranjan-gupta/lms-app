import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";

import {
  Categories,
  FeaturedCourses,
  RecentCourses,
  Loader,
  MockSearchBar,
} from "@/components";
import { useCategories } from "@/core/store/categories";
import { useCourses } from "@/core/store/courses";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  MaterialCommunityIcons,
  FocusAwareStatusBar,
} from "@/ui";

const Courses = () => {
  const { colorScheme } = useColorScheme();
  const courses = useCourses((state) => state.courses);
  const loading = useCourses((state) => state.status);
  const categories = useCategories((state) => state.categories);
  const isPending = useCategories((state) => state.status);
  const [filterCategories, setFilterCategories] = useState<boolean>(false);
  const [sortCalendar, setSortCalendar] = useState<boolean>(false);
  const [sortAlphabetic, setSortAlphabetic] = useState(false);
  const [sortClock, setSortClock] = useState(false);

  const handlePress = () => {
    router.push("/(auth)/(search)");
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
          <View className="w-full px-5 my-2">
            <View className="w-full flex flex-row items-center justify-between">
              <Text className="text-3xl font-extrabold">Find Your Courses</Text>
            </View>
          </View>
          <MockSearchBar
            onPress={handlePress}
            placeholder="Search Your Course"
          />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Popular Courses</Text>
            <Pressable>
              <Text className="text-xs font-bold text-green-500">See all</Text>
            </Pressable>
          </View>
          <View className="py-4">
            <FeaturedCourses courses={courses} loading={loading} />
          </View>
          <View className="w-full px-5 py-1 flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-2">Categories</Text>
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
          </View>
          <Categories categories={categories} loading={isPending} />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-2xl font-bold mb-3">Recent Courses</Text>
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
          <RecentCourses courses={courses} loading={loading} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Courses;
