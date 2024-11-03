import { router } from "expo-router";

import { AntDesign, TouchableOpacity, View } from "@/ui";

interface BackButtonProps {
  onPress?: () => void;
}

export const BackButton = ({ onPress }: BackButtonProps) => {
  const onClick = () => {
    router.back();
    if (onPress) {
      onPress();
    }
  };
  return (
    <TouchableOpacity onPress={onClick}>
      <View className="w-10 h-10 rounded-full items-center justify-center bg-gray-200">
        <AntDesign name="arrowleft" size={24} color={"black"} />
      </View>
    </TouchableOpacity>
  );
};
