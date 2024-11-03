import { router } from "expo-router";

import { InputField } from "@/components";
import { images } from "@/constants";
import { useUser } from "@/core/store/user";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  FocusAwareStatusBar,
  Image,
} from "@/ui";

const Profile = () => {
  const user = useUser((state) => state.user);
  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      <SafeAreaView className="w-full h-full">
        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Text className="text-3xl font-bold my-5">My profile</Text>
          <Button
            onPress={() => router.push("/(auth)/(settings)")}
            variant={"outline"}
            size="lg"
          >
            <Text className="text-xl font-bold" tx="settings.title" />
          </Button>
          <View className="flex items-center justify-center my-5">
            <Image
              source={images.onboarding2}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
          </View>

          <View className="flex flex-col items-start justify-center rounded-lg px-5 py-3">
            <View className="flex flex-col items-start justify-start w-full">
              <InputField
                label="Name"
                placeholder={user?.name || "John Doe"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Email"
                placeholder={user?.email || "johndoe@email.com"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Phone"
                placeholder={"+91-9876543210"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
