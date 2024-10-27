import { router } from "expo-router";
// import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";

import { Filter, JobList, SearchBar } from "@/components";
// import { useCategories } from "@/core/store/categories";
// import { useCompanies } from "@/core/store/companies";
// import { useCourses } from "@/core/store/courses";
import { useDebounce } from "@/core/hooks/useDebounce";
import { useJobs } from "@/core/store/jobs";
import {
  FocusAwareStatusBar,
  useModal,
  View,
  SafeAreaView,
  Pressable,
  AntDesign,
} from "@/ui";

const SearchView = () => {
  // const { colorScheme } = useColorScheme();
  const [query, setQuery] = useState<string>("");
  const modal = useModal();
  // const [durations, setDurations] = useState<string[]>([
  //   "3-8 Hours",
  //   "8-14 Hours",
  //   "14-20 Hours",
  //   "20-24 Hours",
  //   "24-30 Hours",
  // ]);
  // const courses = useCourses((state) => state.courses);
  // const coursesState = useCourses((state) => state.status);
  // const categories = useCategories((state) => state.categories);
  // const categoriesState = useCategories((state) => state.status);
  // const companies = useCompanies((state) => state.companies);
  // const companiesState = useCompanies((state) => state.status);
  const jobs = useJobs((state) => state.jobs);
  const jobsState = useJobs((state) => state.status);
  const debouncedQuery = useDebounce(query);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [jobs, debouncedQuery]);

  const handleClosePress = () => modal.dismiss();
  const handleOpenPress = () => modal.present();

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      <SafeAreaView className="w-full h-full">
        <View className="w-full flex flex-row items-center px-2 py-2">
          <View className="bg-gray-200 flex flex-row items-center justify-center rounded-full w-10 h-10">
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color={"black"} />
            </Pressable>
          </View>
          <View>
            <SearchBar
              onPress={handleOpenPress}
              placeholder="Search"
              query={query}
              setQuery={setQuery}
            />
          </View>
        </View>
        <JobList jobs={filteredJobs} loading={jobsState} />
        <Filter modal={modal} handleClosePress={handleClosePress} />
      </SafeAreaView>
    </View>
  );
};

export default SearchView;
