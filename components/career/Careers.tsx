import { List } from "@/ui";

import { EmptyCard } from "../EmptyCard";

import { CareerCard } from "./CareerCard";
import { CareerCardView } from "./CareerCardView";

import type { Company, Career } from "@/types";
import type { ReactElement } from "react";

interface FeaturedCareersProps {
  careers: Career[];
  loading: string;
}

export const FeaturedCareers = ({ careers, loading }: FeaturedCareersProps) => {
  return (
    <List
      data={careers}
      renderItem={({ item, index }) => <CareerCardView item={item} />}
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
        <EmptyCard title="No careers found" loading={loading} />
      )}
      estimatedItemSize={10}
    />
  );
};

interface RecentCareersProps {
  careers: Career[];
  loading: string;
  company?: Company;
  headerComponent: ReactElement;
}

export const RecentCareers = ({
  careers,
  loading,
  company,
  headerComponent,
}: RecentCareersProps) => {
  return (
    <List
      data={careers}
      renderItem={({ item }) => (
        <CareerCard item={!company ? item : { ...item, company: company }} />
      )}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 5,
        paddingHorizontal: 15,
      }}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={() => (
        <EmptyCard title="No careers found" loading={loading} isImage={true} />
      )}
      estimatedItemSize={10}
      className="w-full h-full"
    />
  );
};

interface CareerListProps {
  careers: Career[];
  loading: string;
  company?: Company;
}

export const CareerList = ({ careers, loading, company }: CareerListProps) => {
  return (
    <List
      data={careers}
      renderItem={({ item }) => (
        <CareerCard item={!company ? item : { ...item, company: company }} />
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
        <EmptyCard title="No careers found" loading={loading} isImage={true} />
      )}
      estimatedItemSize={10}
    />
  );
};
