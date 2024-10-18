import { FlatList } from "react-native";

import { CompanyCard } from "@/components/CompanyCard";
import { CompanyCardView } from "@/components/CompanyCardView";
import { EmptyCard } from "@/components/EmptyCard";
import { Company } from "@/types/type";

export const FeaturedCompanies = ({
  companies,
  loading,
}: {
  companies: Company[];
  loading: string;
}) => {
  return (
    <FlatList
      data={companies}
      renderItem={({ item, index }) => <CompanyCardView item={item} />}
      style={{
        height: 220,
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

export const RecentCompanies = ({
  companies,
  loading,
}: {
  companies: Company[];
  loading: string;
}) => {
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
