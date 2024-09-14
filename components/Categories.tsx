import { FlatList } from "react-native";

import { CategoryCard } from "@/components/CategoryCard";
import { EmptyCard } from "@/components/EmptyCard";
import { Category } from "@/types/type";

export const Categories = ({
  categories,
  loading,
}: {
  categories: Category[];
  loading: string;
}) => {
  return (
    <FlatList
      data={categories}
      renderItem={({ item, index }) => (
        <CategoryCard item={item} index={index} />
      )}
      style={{
        height: 80,
        flexGrow: 0,
      }}
      keyExtractor={(item, index) => index.toString()}
      className="px-5 w-full"
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No categories found" loading={loading} />
      )}
    />
  );
};
