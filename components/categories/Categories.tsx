import { List } from "@/ui";

import { EmptyCard } from "../EmptyCard";

import { CategoryCard } from "./CategoryCard";

import type { Category } from "@/types";

interface CategoriesProps {
  categories: Category[];
  loading: string;
}

export const Categories = ({ categories, loading }: CategoriesProps) => {
  return (
    <List
      data={categories}
      renderItem={({ item, index }) => (
        <CategoryCard item={item} index={index} />
      )}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyCard title="No categories found" loading={loading} />
      )}
      estimatedItemSize={10}
    />
  );
};
