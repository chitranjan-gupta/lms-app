import { FlatList } from "@/ui";

import { EmptyCard } from "../EmptyCard";

import { CompanyCard } from "./CompanyCard";
import { CompanyCardView } from "./CompanyCardView";

import type { Company } from "@/types";

interface FeaturedCompaniesProps {
  companies: Company[];
  loading: string;
}

export const FeaturedCompanies = ({
  companies,
  loading,
}: FeaturedCompaniesProps) => {
  return (
    <FlatList
      data={companies}
      renderItem={({ item, index }) => <CompanyCardView item={item} />}
      style={{
        height: 300,
        flexGrow: 0,
        marginTop: 5,
        marginBottom: 5,
      }}
      keyExtractor={(item, index) => index.toString()}
      className="px-5 w-full"
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No companies found" loading={loading} />
      )}
    />
  );
};

interface RecentCompaniesProps {
  companies: Company[];
  loading: string;
}

export const RecentCompanies = ({
  companies,
  loading,
}: RecentCompaniesProps) => {
  return (
    <FlatList
      data={companies}
      renderItem={({ item }) => <CompanyCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      className="px-5"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      ListEmptyComponent={() => (
        <EmptyCard
          title="No companies found"
          loading={loading}
          isImage={true}
        />
      )}
    />
  );
};
