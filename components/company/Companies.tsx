import { MotiView } from "moti";
import { Dimensions, RefreshControl } from "react-native";

import { List } from "@/ui";

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
    <List
      data={companies}
      renderItem={({ item, index }) => <CompanyCardView item={item} />}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No companies found" loading={loading} />
      )}
      estimatedItemSize={10}
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
    <List
      data={companies}
      renderItem={({ item, index }) => <CompanyCard item={item} />}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard
          title="No companies found"
          loading={loading}
          isImage={true}
        />
      )}
      numColumns={2}
      estimatedItemSize={10}
      contentContainerStyle={{
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    />
  );
};

interface CompaniesListProps {
  companies: Company[];
  loading: string;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  onEndReached: () => Promise<void>;
}

export const CompaniesList = ({
  companies,
  loading,
  refreshing,
  onRefresh,
  onEndReached,
}: CompaniesListProps) => {
  return (
    <List
      data={companies}
      renderItem={({ item, index }) => (
        <MotiView
          style={{ width: Dimensions.get("window").width / 2 - 20 }}
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1000 + index * 200 }}
        >
          <CompanyCardView item={item} />
        </MotiView>
      )}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard
          title="No companies found"
          loading={loading}
          isImage={true}
        />
      )}
      numColumns={2}
      estimatedItemSize={10}
      contentContainerStyle={{
        paddingVertical: 10,
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};
