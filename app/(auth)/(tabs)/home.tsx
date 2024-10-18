import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Loader } from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth, signOut } from "@/core/auth";
import { useInit } from "@/core/hooks/useInit";
import { useUser } from "@/core/store/user";

const Home = () => {
  const colorScheme = useColorScheme();
  const user = useUser((state) => state.user);
  const removeUser = useUser((state) => state.removeUser);
  const isloading = useAuth((state) => state.isloading);
  const { loading } = useInit();

  const handleSignOut = async () => {
    removeUser();
    await signOut();
  };

  return (
    <ThemedView className="w-full h-full" lightColor="white" darkColor="black">
      {loading ? (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      ) : (
        <SafeAreaView className=" w-full h-full">
          <ThemedView className="w-full px-5">
            <ThemedView className="w-full flex flex-row items-center justify-between my-5">
              <ThemedText
                className="text-2xl font-extrabold"
                lightColor="black"
                darkColor="white"
              >{`Welcome ${user?.name || ""} 👋`}</ThemedText>
              <TouchableOpacity
                onPress={handleSignOut}
                className={`justify-center items-center w-10 h-10 rounded-full ${colorScheme === "light" ? "bg-white" : ""}`}
                disabled={isloading}
              >
                <Feather
                  name="log-out"
                  size={24}
                  color={colorScheme === "light" ? "black" : "white"}
                />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      )}
    </ThemedView>
  );
};

export default Home;
