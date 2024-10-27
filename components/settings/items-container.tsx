import { View, Text } from "@/ui";

import type { TxKeyPath } from "@/core/i18n";

interface ItemsContainerProps {
  children: React.ReactNode;
  title?: TxKeyPath;
}

export const ItemsContainer = ({ children, title }: ItemsContainerProps) => {
  return (
    <>
      {title && <Text className="pb-2 pt-4 text-lg " tx={title} />}
      {
        <View className=" rounded-md border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800">
          {children}
        </View>
      }
    </>
  );
};
