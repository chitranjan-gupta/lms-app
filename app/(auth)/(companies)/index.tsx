import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { ExternalLink } from "@/components/ExternalLink";
import { FlipCard } from "@/components/FlipCard";
import { RecentJobs } from "@/components/Jobs";
import { Loader } from "@/components/Loader";
import { SwitchBar } from "@/components/SwitchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCompany } from "@/core/store/company";
import { shadowStyle } from "@/styles";

const CompaniesView = () => {
  const colorScheme = useColorScheme();
  const companyStatus = useCompany((state) => state.status);
  const companyid = useCompany((state) => state.companyid);
  const company = useCompany((state) => state.company);
  const getCompany = useCompany((state) => state.getCompany);
  const isOn = useSharedValue<boolean>(false);
  const isFlipped = useSharedValue(false);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (companyid) {
      getCompany();
    }
  }, [companyid, getCompany]);

  const handlePress = () => {
    isOn.value = !isOn.value;
    isFlipped.value = !isFlipped.value;
    setIsActive((prev) => !prev);
  };

  return (
    <ThemedView className="w-full h-full" lightColor="white" darkColor="black">
      {companyStatus !== "pending" && company ? (
        <SafeAreaView className="flex flex-col justify-between w-full h-full">
          <ThemedView lightColor="transparent" darkColor="transparent">
            <ThemedView
              className="flex flex-row w-full h-[40px] items-center justify-between px-2 mt-2"
              lightColor="transparent"
              darkColor="transparent"
            >
              <TouchableOpacity onPress={() => router.back()}>
                <ThemedView
                  className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center"
                  lightColor="transparent"
                  darkColor="transparent"
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                </ThemedView>
              </TouchableOpacity>
              <TouchableOpacity>
                <ThemedView
                  className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center"
                  lightColor="transparent"
                  darkColor="transparent"
                >
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </ThemedView>
              </TouchableOpacity>
            </ThemedView>

            <ThemedView
              className="w-full flex flex-col justify-center items-center mb-5"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedView className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
                <Image
                  source={company?.logo_url}
                  contentFit="contain"
                  className="w-20 h-20"
                />
              </ThemedView>
              <ThemedView lightColor="transparent" darkColor="transparent">
                <ThemedText className="text-base">{company?.name}</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView
              className="w-full flex flex-row justify-center items-center gap-x-5 px-2 mb-5"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedView
                style={shadowStyle.shadowBlack}
                className="bg-gray-200 p-3 rounded-xl"
              >
                <ThemedText className="text-black text-base">
                  {company?.industry}
                </ThemedText>
              </ThemedView>
              <ThemedView
                style={shadowStyle.shadowBlack}
                className="bg-gray-200 p-3 rounded-xl"
              >
                <ThemedText className="text-black text-base">
                  {company?.location}
                </ThemedText>
              </ThemedView>
              <ThemedView
                style={shadowStyle.shadowBlack}
                className="bg-gray-200 p-3 rounded-xl"
              >
                <ThemedText className="text-black text-base">
                  {company?.jobs.length}
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView
              className="px-2 w-full mb-5"
              lightColor="transparent"
              darkColor="transparent"
            >
              <SwitchBar
                value={isOn}
                isActive={isActive}
                onPress={handlePress}
                style={{
                  height: 50,
                }}
              />
            </ThemedView>
            <FlipCard
              isFlipped={isFlipped}
              cardStyle={{
                width: "100%",
              }}
              FlippedContent={
                <ThemedView
                  className="flex flex-col px-2 mb-2 w-full"
                  lightColor="transparent"
                  darkColor="transparent"
                >
                  <RecentJobs jobs={company?.jobs!} loading={companyStatus} />
                </ThemedView>
              }
              RegularContent={
                <ThemedView
                  className="w-full"
                  lightColor="transparent"
                  darkColor="transparent"
                >
                  <ThemedView
                    className="flex flex-col px-2 mb-2"
                    lightColor="transparent"
                    darkColor="transparent"
                  >
                    <ThemedText className="font-bold text-xl">
                      Description
                    </ThemedText>
                    <ThemedText>{company?.description}</ThemedText>
                  </ThemedView>
                  <ThemedView
                    className="flex flex-col px-2 mb-2"
                    lightColor="transparent"
                    darkColor="transparent"
                  >
                    <ThemedText className="font-bold text-xl">
                      Company Culture
                    </ThemedText>
                    <ThemedText>Lorem ipsum</ThemedText>
                  </ThemedView>
                </ThemedView>
              }
            />
          </ThemedView>
          <ThemedView
            className="px-2 mb-2"
            lightColor="transparent"
            darkColor="transparent"
          >
            <CustomButton>
              {company?.website_url ? (
                <ExternalLink
                  href={company?.website_url!}
                  className="text-white font-bold text-lg"
                >
                  Visit Now
                </ExternalLink>
              ) : (
                <></>
              )}
            </CustomButton>
          </ThemedView>
        </SafeAreaView>
      ) : (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      )}
    </ThemedView>
  );
};

export default CompaniesView;
