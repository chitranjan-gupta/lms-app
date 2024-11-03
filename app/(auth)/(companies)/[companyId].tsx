import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

import {
  CustomButton,
  ExternalLink,
  FlipCard,
  RecentCareers,
  Loader,
  SwitchBar,
  BackButton,
} from "@/components";
import { useCompany } from "@/core/store/company";
import { shadowStyle } from "@/styles";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Entypo,
  FocusAwareStatusBar,
  ImageBackground,
} from "@/ui";

const CompanyView = () => {
  const { colorScheme } = useColorScheme();
  const { companyId } = useLocalSearchParams();
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
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      {companyStatus !== "pending" && company ? (
        <SafeAreaView className="flex flex-col justify-between w-full h-full">
          <View>
            <View className="flex flex-row w-full h-[40px] items-center justify-between px-2 mt-2">
              <BackButton />
              <TouchableOpacity>
                <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>

            <View className="w-full flex flex-col justify-center items-center mb-5">
              <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
                <ImageBackground
                  source={company?.logo_url}
                  contentFit="contain"
                  className="w-20 h-20"
                >
                  <View className="w-20 h-20 rounded-full"></View>
                </ImageBackground>
              </View>
              <View>
                <Text className="text-base">{company?.name}</Text>
              </View>
            </View>
            <View className="w-full flex flex-row justify-center items-center gap-x-5 px-2 mb-5">
              <View
                style={shadowStyle.shadowBlack}
                className="bg-gray-200 p-3 rounded-xl"
              >
                <Text className="!text-black text-base">
                  {company?.industry}
                </Text>
              </View>
              <View
                style={shadowStyle.shadowBlack}
                className="bg-gray-200 p-3 rounded-xl"
              >
                <Text className="!text-black text-base">
                  {company?.location}
                </Text>
              </View>
              <View
                style={shadowStyle.shadowBlack}
                className="bg-gray-200 p-3 rounded-xl"
              >
                <Text className="!text-black text-base">
                  {company?.careers.length}
                </Text>
              </View>
            </View>
            <View className="px-2 w-full mb-5">
              <SwitchBar
                value={isOn}
                isActive={isActive}
                onPress={handlePress}
                style={{
                  height: 50,
                }}
              />
            </View>
            <FlipCard
              isFlipped={isFlipped}
              cardStyle={{
                width: "100%",
              }}
              FlippedContent={
                <View className="flex flex-col px-2 mb-2 w-full h-full bg-white dark:bg-black">
                  <RecentCareers
                    careers={company?.careers}
                    loading={companyStatus}
                    company={company}
                    headerComponent={<></>}
                  />
                </View>
              }
              RegularContent={
                <View className="w-full">
                  <View className="flex flex-col px-2 mb-2">
                    <Text className="font-bold text-xl">Description</Text>
                    <Text>{company?.description}</Text>
                  </View>
                  <View className="flex flex-col px-2 mb-2">
                    <Text className="font-bold text-xl">Company Culture</Text>
                    <Text></Text>
                  </View>
                </View>
              }
            />
          </View>
          <View className="px-2 mb-2">
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
          </View>
        </SafeAreaView>
      ) : (
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      )}
    </View>
  );
};

export default CompanyView;
