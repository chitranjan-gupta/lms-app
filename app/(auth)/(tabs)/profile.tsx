import { useEffect } from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { images } from "@/constants";
import { useUser } from "@/core/store/user";

const Profile = () => {
  const user = useUser((state) => state.user);
  const getUser = useUser((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <ThemedView>
      <SafeAreaView className="w-full h-full">
        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <ThemedText className="text-3xl font-bold my-5">
            My profile
          </ThemedText>

          <ThemedView className="flex items-center justify-center my-5">
            <Image
              source={images.onboarding2}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
          </ThemedView>

          <ThemedView className="flex flex-col items-start justify-center rounded-lg px-5 py-3">
            <ThemedView className="flex flex-col items-start justify-start w-full">
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
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Profile;
