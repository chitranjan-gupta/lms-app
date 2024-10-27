import { FlatList } from "@/ui";
import { List } from "@/ui/list";

import { EmptyCard } from "../EmptyCard";

import { JobCard } from "./JobCard";
import { JobCardView } from "./JobCardView";

import type { Company, Job } from "@/types";
import type { ReactElement } from "react";

interface FeaturedJobsProps {
  jobs: Job[];
  loading: string;
}

export const FeaturedJobs = ({ jobs, loading }: FeaturedJobsProps) => {
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

interface RecentJobsProps {
  jobs: Job[];
  loading: string;
  company?: Company;
  headerComponent: ReactElement;
}

export const RecentJobs = ({
  jobs,
  loading,
  company,
  headerComponent,
}: RecentJobsProps) => {
  return (
    <FlatList
      data={jobs}
      renderItem={({ item }) => (
        <JobCard item={!company ? item : { ...item, company: company }} />
      )}
      keyExtractor={(item, index) => index.toString()}
      className="px-4"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
      }}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={() => (
        <EmptyCard title="No jobs found" loading={loading} isImage={true} />
      )}
    />
  );
};

interface JobListProps {
  jobs: Job[];
  loading: string;
  company?: Company;
}

export const JobList = ({ jobs, loading, company }: JobListProps) => {
  return (
    <List
      data={jobs}
      renderItem={({ item }) => (
        <JobCard item={!company ? item : { ...item, company: company }} />
      )}
      keyExtractor={(item, index) => index.toString()}
      className="w-full h-full"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
      ListEmptyComponent={() => (
        <EmptyCard title="No jobs found" loading={loading} isImage={true} />
      )}
      estimatedItemSize={10}
    />
  );
};
