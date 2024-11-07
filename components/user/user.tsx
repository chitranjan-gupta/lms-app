import { images } from "@/constants";
import { View, Image, Text } from "@/ui";

import type { User } from "@/types";

export const UserProfile = ({ user }: { user: User | null }) => {
  return (
    <View className="flex flex-row items-center gap-x-1">
      <View className="rounded-full">
        <Image
          source={images.onboarding1}
          alt={user?.name || "user"}
          style={{ width: 60, height: 60, borderRadius: 99999 }}
          contentFit="contain"
        />
      </View>
      <View>
        <Text className="text-2xl font-extrabold">{`Welcome`}</Text>
        <Text
          className="text-xl font-extrabold"
          numberOfLines={1}
        >{`${user?.name || ""} 👋`}</Text>
      </View>
    </View>
  );
};
