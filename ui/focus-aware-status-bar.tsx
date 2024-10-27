import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import type { ComponentProps } from "react";

type FocusAwareStatusBarProps = ComponentProps<typeof StatusBar>;

export const FocusAwareStatusBar = (props: FocusAwareStatusBarProps) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const barStyle = isDark ? "light" : "dark";

  return isFocused ? <StatusBar style={barStyle} {...props} /> : null;
};
