import { useRef, useState } from "react";

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FocusAwareStatusBar,
  Swiper,
  Image,
} from "@/ui";

import { CustomButton } from "../CustomButton";

import type { Onboarding } from "@/types";

interface SwipeOnboardingProps {
  data: Onboarding[];
  onSkip: () => void;
  onPress: () => void;
}

export const SwipeOnboarding = ({
  data,
  onPress,
  onSkip,
}: SwipeOnboardingProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<Swiper>(null);

  const isLastSlide = activeIndex === data.length - 1;

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />
      <SafeAreaView className="w-full h-full">
        <View className="w-full h-full flex items-center justify-between p-5">
          <TouchableOpacity
            onPress={onSkip}
            className="w-full flex justify-end items-end p-5"
          >
            <Text className="text-md">Skip</Text>
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
            {data.map((item: any) => (
              <View
                key={item.id}
                className="w-full flex items-center justify-center p-5"
              >
                <Image
                  source={item.image}
                  className="w-[300px] h-[300px]"
                  contentFit="contain"
                >
                  <View className="w-[300px] h-[300px]"></View>
                </Image>
                <View className="flex flex-row items-center justify-center w-full mt-10">
                  <Text className="text-3xl font-bold mx-10 text-center">
                    {item.title}
                  </Text>
                </View>
                <Text className="text-md text-center mx-10 mt-3">
                  {item.description}
                </Text>
              </View>
            ))}
          </Swiper>

          <CustomButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={onPress}
            className="w-11/12 mt-10 mb-5"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
