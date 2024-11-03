// import { useColorScheme } from "nativewind";
import { useMemo, useState } from "react";

import { Filter, CareerList, SearchBar, BackButton } from "@/components";
// import { useCategories } from "@/core/store/categories";
// import { useCompanies } from "@/core/store/companies";
// import { useCourses } from "@/core/store/courses";
import { useDebounce } from "@/core/hooks/useDebounce";
import { useCareers } from "@/core/store/career";
import { FocusAwareStatusBar, useModal, View, SafeAreaView } from "@/ui";

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
  const careers = useCareers((state) => state.careers);
  const careersState = useCareers((state) => state.status);
  const debouncedQuery = useDebounce(query);

  const filteredCareers = useMemo(() => {
    return careers.filter((job) =>
      job.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [careers, debouncedQuery]);

  const handleClosePress = () => modal.dismiss();
  const handleOpenPress = () => modal.present();

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
        <CareerList careers={filteredCareers} loading={careersState} />
        <Filter modal={modal} handleClosePress={handleClosePress} />
      </SafeAreaView>
    </View>
  );
};

export default SearchView;
