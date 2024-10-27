import { ReactNativeModal } from "react-native-modal";

import { View, AntDesign, Text } from "@/ui";

import { CustomButton } from "./CustomButton";

import type { Dispatch, SetStateAction } from "react";

interface SuccessModalProps {
  showSuccessModal: boolean;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  onPress: () => void;
}

export const SuccessModal = ({
  showSuccessModal,
  setShowSuccessModal,
  onPress,
}: SuccessModalProps) => {
  return (
    <View>
      <ReactNativeModal isVisible={showSuccessModal} className="ml-[12%]">
        <View className="bg-white dark:bg-black px-4 rounded-2xl h-[320px] w-[300px] flex flex-col justify-center items-center gap-y-5">
          <View className="flex flex-row justify-center items-center">
            <AntDesign name="checkcircle" size={60} color="#0096FF" />
          </View>
          <Text className="text-3xl text-center">Success</Text>
          <Text className="text-base text-gray-400 text-center mt-2">
            Congratulations, you have successfully completed your registration.
          </Text>
          <CustomButton
            title="Log In"
            onPress={onPress}
            className="mt-5 rounded-lg"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};
