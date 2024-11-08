// import { useColorScheme } from "nativewind";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState, useEffect } from "react";

import { Filter, CareersList, SearchBar, BackButton } from "@/components";
import { useDebounce } from "@/core/hooks/useDebounce";
import { useCareers } from "@/core/store/career";
// import { useCategories } from "@/core/store/categories";
// import { useCompanies } from "@/core/store/company";
// import { useCourses } from "@/core/store/courses";
import {
  FocusAwareStatusBar,
  useModal,
  View,
  SafeAreaView,
  Text,
  Pressable,
} from "@/ui";

const SearchView = () => {
  const { searchparams } = useLocalSearchParams();
  const initialFilters = Array.isArray(searchparams)
    ? searchparams
    : searchparams
      ? [searchparams] // If it's a single string, make it an array
      : [];
  // console.log(searchparams);
  // const { colorScheme } = useColorScheme();
  const [query, setQuery] = useState<string>("");
  const [selectedFilters, setSelectedFilters] =
    useState<string[]>(initialFilters);
  const [filters] = useState<string[]>(["career", "company", "course"]);
  const modal = useModal();
  // const [durations, setDurations] = useState<string[]>([
  //   "3-8 Hours",
  //   "8-14 Hours",
  //   "14-20 Hours",
  //   "20-24 Hours",
  //   "24-30 Hours",
  // ]);
  // const { courses, status: coursesState } = useCourses();
  // const { categories, status: categoriesState } = useCategories();
  // const { companies, status: companiesState } = useCompanies();
  const { careers, status: careersState } = useCareers();
  const debouncedQuery = useDebounce(query);
  const filteredCareers = useMemo(() => {
    return careers.filter((job) =>
      job.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [careers, debouncedQuery]);
  const handleClosePress = () => modal.dismiss();
  const handleOpenPress = () => modal.present();

  const handlePress = (value: string) => {
    const isPresent = selectedFilters.findIndex(
      (selectedFilter) => selectedFilter === value,
    );
    if (isPresent < 0) {
      setSelectedFilters((prev) => [...prev, value]);
    } else {
      setSelectedFilters((prev) =>
        prev.filter((selectedFilter) => selectedFilter !== value),
      );
    }
  };

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      <SafeAreaView className="w-full h-full">
        <View className="w-full flex flex-row items-center px-2 py-2">
          <BackButton />
          <View>
            <SearchBar
              onPress={handleOpenPress}
              placeholder="Search"
              query={query}
              setQuery={setQuery}
            />
          </View>
        </View>
        <View className="flex flex-row gap-x-2">
          {filters.map((filter) => (
            <View
              key={filter}
              className={`bg-blue-500 w-20 h-6 rounded-full border ${
                selectedFilters.findIndex(
                  (selectedFilter) => selectedFilter === filter,
                ) > -1
                  ? "border-white"
                  : ""
              }`}
            >
              <Pressable onPress={() => handlePress(filter)}>
                <Text className="text-center">{filter}</Text>
              </Pressable>
            </View>
          ))}
        </View>
        {/* <CareersList careers={filteredCareers} loading={careersState} /> */}
        <Filter modal={modal} handleClosePress={handleClosePress} />
      </SafeAreaView>
    </View>
  );
};

export default SearchView;
