import { useColorScheme } from "nativewind";

import { Loader } from "@/components";
import { useAuth } from "@/core/auth";
import { useInit } from "@/core/hooks/useInit";
import { useUser } from "@/core/store/user";
import {
  TouchableOpacity,
  SafeAreaView,
  Text,
  View,
  Feather,
  FocusAwareStatusBar,
} from "@/ui";

const Home = () => {
  const { colorScheme } = useColorScheme();
  const user = useUser((state) => state.user);
  const removeUser = useUser((state) => state.removeUser);
  const authStatus = useAuth((state) => state.isloading);
  const signOut = useAuth((state) => state.signOut);
  const { loading } = useInit();

  const handleSignOut = async () => {
    removeUser();
    await signOut();
  };

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      {loading ? (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      ) : (
        <SafeAreaView className="w-full h-full">
          <View className="w-full px-5">
            <View className="w-full flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-extrabold">{`Welcome ${user?.name || ""} 👋`}</Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className={`justify-center items-center w-10 h-10 rounded-full bg-gray-200`}
                disabled={authStatus}
              >
                <Feather name="log-out" size={24} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Home;
