import { FlatList } from "react-native";

import { EmptyCard } from "@/components/EmptyCard";
import { JobCard } from "@/components/JobCard";
import { JobCardView } from "@/components/JobCardView";
import { Job } from "@/types/type";

export const FeaturedJobs = ({
  jobs,
  loading,
}: {
  jobs: Job[];
  loading: string;
}) => {
  return (
    <FlatList
      data={jobs}
      renderItem={({ item, index }) => <JobCardView item={item} />}
      style={{
        height: 220,
        flexGrow: 0,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
      }}
      keyExtractor={(item, index) => index.toString()}
      className="px-5 w-full"
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No jobs found" loading={loading} />
      )}
    />
  );
};

export const RecentJobs = ({
  jobs,
  loading,
}: {
  jobs: Job[];
  loading: string;
}) => {
  return (
    <FlatList
      data={jobs}
      renderItem={({ item }) => <JobCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      className="px-5"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      ListEmptyComponent={() => (
        <EmptyCard title="No jobs found" loading={loading} isImage={true} />
      )}
    />
  );
};
