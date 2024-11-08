import { router } from "expo-router";

import { AnimatedOnboarding } from "@/components";
import { data } from "@/constants";
import { useFirstTime } from "@/core/store/use-first";
import { View } from "@/ui";

const Onboarding = () => {
  const { setStatus } = useFirstTime();

  const onPress = () => {
    setStatus("no");
    router.replace("/(unauth)/sign-up");
  };

  return (
    <View className="w-full h-full">
      <AnimatedOnboarding onPress={onPress} data={data.onboarding} />
    </View>
  );
};

export default Onboarding;
