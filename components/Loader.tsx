import { ActivityIndicator } from "react-native";

import { ThemedView } from "@/components/ThemedView";

interface LoaderProps {
  variant: "small" | "large";
  color: string;
}

export const Loader = ({ variant, color }: LoaderProps) => {
  return (
    <ThemedView
      className={`${variant === "large" ? "w-full h-full" : ""} flex flex-row justify-center items-center`}
    >
      <ActivityIndicator size={variant} color={color} />
    </ThemedView>
  );
};
