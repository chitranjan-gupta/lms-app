import { useColorScheme } from "nativewind";

import { Pressable, View, Text, AntDesign } from "@/ui";

import type { TxKeyPath } from "@/core/i18n";

interface ItemProps {
  text: TxKeyPath;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const Item = ({ text, value, icon, onPress }: ItemProps) => {
  const { colorScheme } = useColorScheme();
  const isPressable = onPress !== undefined;
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? "auto" : "none"}
      className="flex-1 flex-row items-center justify-between px-4 py-2"
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text tx={text} className="" />
      </View>
      <View className="flex-row items-center">
        <Text className="text-neutral-600">{value}</Text>
        {isPressable && (
          <View className="pl-2">
            <AntDesign
              name="arrowright"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};
