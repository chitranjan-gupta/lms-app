import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { STATUS, useFirstTime } from "@/core/store/use-first";

const Onboarding = () => {
  const setStatus = useFirstTime((state) => state.setStatus);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<Swiper>(null);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View className="w-full h-full bg-white">
      <SafeAreaView className="flex h-full items-center justify-between bg-white">
        <TouchableOpacity
          onPress={async () => {
            setStatus(STATUS.no);
            router.replace("/(unauth)/sign-up");
          }}
          className="w-full flex justify-end items-end p-5"
        >
          <Text className="text-black text-md">Skip</Text>
        </TouchableOpacity>

        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
          }
          activeDot={
            <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item: any) => (
            <View
              key={item.id}
              className="flex items-center justify-center p-5"
            >
              <Image
                source={item.image}
                className="w-full h-[300px]"
                resizeMode="contain"
              />
              <View className="flex flex-row items-center justify-center w-full mt-10">
                <Text className="text-black text-3xl font-bold mx-10 text-center">
                  {item.title}
                </Text>
              </View>
              <Text className="text-md text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>

        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={async () => {
            if (isLastSlide) {
              setStatus(STATUS.no);
              router.replace("/(unauth)/sign-up");
            } else {
              swiperRef.current?.scrollBy(1);
            }
          }}
          className="w-11/12 mt-10 mb-5"
        />
      </SafeAreaView>
    </View>
  );
};

export default Onboarding;
