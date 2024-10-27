import { ActivityIndicator, View } from "@/ui";

interface LoaderProps {
  variant: "small" | "large";
  color: string;
}

export const Loader = ({ variant, color }: LoaderProps) => {
  return (
    <View
      className={`${variant === "large" ? "w-full h-full" : ""} flex flex-row justify-center items-center`}
    >
      <ActivityIndicator size={variant} color={color} />
    </View>
  );
};
