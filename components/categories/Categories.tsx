import { FlatList } from "@/ui";

import { EmptyCard } from "../EmptyCard";

import { CategoryCard } from "./CategoryCard";

import type { Category } from "@/types";

interface CategoriesProps {
  categories: Category[];
  loading: string;
}

export const Categories = ({ categories, loading }: CategoriesProps) => {
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
