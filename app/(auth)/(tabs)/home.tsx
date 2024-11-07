import { useColorScheme } from "nativewind";
import { useMemo } from "react";

import { Loader, CustomImageCarousel, UserProfile } from "@/components";
import { useInit } from "@/core/hooks/useInit";
import { useCompanies } from "@/core/store/company";
import { useUser } from "@/core/store/user";
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  FocusAwareStatusBar,
  MaterialCommunityIcons,
} from "@/ui";

const Home = () => {
  const { colorScheme } = useColorScheme();
  const user = useUser((state) => state.user);
  const { companies } = useCompanies();
  const { loading } = useInit();

  const companiesToDisplay = useMemo(
    () => [...companies].slice(0, 5),
    [companies],
  );

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
              <UserProfile user={user} />
              <TouchableOpacity
                className={`justify-center items-center w-10 h-10 rounded-full bg-gray-200`}
              >
                <MaterialCommunityIcons
                  name="bell-badge"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View></View>
          <CustomImageCarousel
            data={companiesToDisplay}
            autoPlay={true}
            pagination={true}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Home;
