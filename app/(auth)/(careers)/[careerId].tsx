import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Share } from "react-native";

import { BackButton, CustomButton, ExternalLink, Loader } from "@/components";
import { useCareer } from "@/core/store/career";
import { setCompany } from "@/core/store/company";
import { camelCase } from "@/lib";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Feather,
  Entypo,
  FontAwesome,
  FocusAwareStatusBar,
  ImageBackground,
  Alert,
} from "@/ui";

const CareerView = () => {
  const { colorScheme } = useColorScheme();
  const { careerId } = useLocalSearchParams();
  const careerid = useCareer((state) => state.careerid);
  const career = useCareer((state) => state.career);
  const careerStatus = useCareer((state) => state.status);
  const getCareer = useCareer((state) => state.getCareer);

  useEffect(() => {
    if (careerid) {
      getCareer();
    }
  }, [careerid, getCareer]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: career?.career_url!,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const onPress = () => {
    setCompany({ companyId: career?.company.id! });
    router.push("/(auth)/(companies)");
  };

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      {careerStatus !== "pending" && career ? (
        <SafeAreaView className="flex flex-col justify-between w-full h-full">
          <View className="flex flex-row w-full h-[40px] items-center justify-between px-2 my-2">
            <BackButton />
            <TouchableOpacity>
              <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
                <Feather name="bookmark" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView className="w-full">
            <View className="w-full">
              <View className="w-full flex flex-row justify-start items-center gap-x-5 mb-5 px-2">
                <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center">
                  <ImageBackground
                    source={career?.company?.logo_url}
                    contentFit="contain"
                    className="w-16 h-16"
                  >
                    <View className="w-16 h-16"></View>
                  </ImageBackground>
                </View>
                <View className="w-2/3 overflow-hidden">
                  <Text className="text-base" numberOfLines={1}>
                    {career?.company?.name}
                  </Text>
                  <Text className="text-xl font-bold" numberOfLines={1}>
                    {career?.title}
                  </Text>
                </View>
              </View>
              <View className="w-full flex flex-col gap-y-5 px-2 mb-5">
                <View className="flex flex-row gap-x-2">
                  <Entypo
                    name="location-pin"
                    size={24}
                    color={colorScheme === "light" ? "black" : "white"}
                  />
                  <Text className="text-base">{career?.location}</Text>
                </View>
                <View className="flex flex-row gap-x-2 pl-1.5">
                  <FontAwesome
                    name="rupee"
                    size={24}
                    color={colorScheme === "light" ? "black" : "white"}
                  />
                  <Text className="text-base">{career?.salary_range}</Text>
                </View>
              </View>
              <View className="w-full flex flex-row justify-center items-start gap-x-5 gap-y-5 px-2 mb-5">
                <View className="flex flex-col gap-x-2">
                  <Text className="text-base">Level</Text>
                  <Text className="text-base" numberOfLines={1}>
                    {camelCase(career?.level || "")}
                  </Text>
                </View>
                <View className="flex flex-col gap-x-2 border-l border-r px-5">
                  <Text className="text-base">Career Type</Text>
                  <Text className="text-base" numberOfLines={1}>
                    {camelCase(career?.career_type || "")}
                  </Text>
                </View>
                <View className="flex flex-col gap-x-2">
                  <Text className="text-base">Work Mode</Text>
                  <Text className="text-base" numberOfLines={1}>
                    {camelCase(career?.work_mode || "")}
                  </Text>
                </View>
              </View>
              <View className="p-2">
                <Text className="text-base">
                  {`Application Deadline: ${new Date(career.application_deadline!).toDateString()}`}
                </Text>
              </View>
              {/* <View
                className="p-2 rounded-xl mx-2"
                lightColor="pink"
                darkColor="pink"
              >
                <Text className="text-black text-base">
                  This career post is managed by
                </Text>
                <View
                  className="px-2 flex flex-row items-center justify-start"
                  lightColor="transparent"
                  darkColor="transparent"
                >
                  <View
                    className="px-2 rounded-full"
                    lightColor="transparent"
                    darkColor="transparent"
                  >
                    <ImageBackground
                      source={images.background}
                      contentFit="contain"
                      className="w-20 h-20"
                    />
                  </View>
                  <View
                    className="flex flex-col gap-x-2"
                    lightColor="transparent"
                    darkColor="transparent"
                  >
                    <Text className="text-black text-base">
                      Akash
                    </Text>
                    <Text className="text-black text-base">
                      Online 2 Days ago
                    </Text>
                  </View>
                </View>
              </View> */}
              <View className="flex flex-col gap-x-2 px-2">
                <Text className="text-xl font-bold">Skills</Text>
                <View className="flex flex-row flex-wrap gap-x-2 gap-y-2">
                  {career.skills?.map((skill, index) => (
                    <View
                      className="flex flex-row justify-center items-center border p-2 rounded-xl"
                      key={index}
                    >
                      <Text className="text-sm">{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="px-2">
                <Text className="text-xl font-bold">Description</Text>
                <Text className="text-sm">{career?.description}</Text>
              </View>
              <View className="px-2">
                <Text className=" text-xl font-bold">Responsibilities</Text>
                {career.responsibilities?.map((responsibility, index) => (
                  <View className="px-2 flex flex-row items-center" key={index}>
                    <Entypo
                      name="dot-single"
                      size={24}
                      color={colorScheme === "light" ? "black" : "white"}
                    />
                    <Text className="text-sm">{responsibility}</Text>
                  </View>
                ))}
              </View>
              <View className="px-2">
                <Text className="text-xl font-bold">Requirements</Text>
                {career.requirements?.map((requirement, index) => (
                  <View className="px-2 flex flex-row items-center" key={index}>
                    <Entypo
                      name="dot-single"
                      size={24}
                      color={colorScheme === "light" ? "black" : "white"}
                    />
                    <Text className="text-sm">{requirement}</Text>
                  </View>
                ))}
              </View>
              <View className="px-2">
                <Text className="text-xl font-bold">About the company</Text>
                <View>
                  <TouchableOpacity onPress={onPress}>
                    <View className="w-full flex flex-row justify-start items-center gap-x-5 mb-5 px-2">
                      <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center">
                        <ImageBackground
                          source={career?.company?.logo_url}
                          contentFit="contain"
                          className="w-16 h-16"
                        >
                          <View className="w-16 h-16"></View>
                        </ImageBackground>
                      </View>
                      <View className="w-2/3 overflow-hidden">
                        <Text className="text-base" numberOfLines={1}>
                          {career?.company?.name}
                        </Text>
                        <Text className="text-base" numberOfLines={1}>
                          {career?.company?.industry}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          <View className="relative px-2 mb-2 flex flex-row gap-x-2">
            <CustomButton className="w-20" onPress={onShare}>
              <Entypo name="share" size={24} color="white" />
            </CustomButton>
            <CustomButton className="w-3/4">
              {career?.career_url ? (
                <ExternalLink
                  href={career?.career_url!}
                  className="text-white font-bold text-lg"
                >
                  Apply Now
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

export default CareerView;
