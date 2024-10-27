import { ReactNativeModal } from "react-native-modal";

import { View, Text, Feather } from "@/ui";

import { CustomButton } from "./CustomButton";
import { InputField } from "./InputField";

import type { SignUpForm, Verification } from "@/types";
import type { Dispatch, SetStateAction } from "react";

interface OTPModalProps {
  verification: Verification;
  setVerification: Dispatch<SetStateAction<Verification>>;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  form: SignUpForm;
  onPressVerify: () => Promise<void>;
}

export const OTPModal = ({
  verification,
  setShowSuccessModal,
  form,
  setVerification,
  onPressVerify,
}: OTPModalProps) => {
  return (
    <View>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl mb-2">Verification</Text>
          <Text className="mb-5">
            We've sent a verification code to {form.email}.
          </Text>
          <InputField
            label={"Code"}
            IconLeft={<Feather name="lock" size={24} color="black" />}
            placeholder={"12345"}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(code: any) =>
              setVerification({ ...verification, code })
            }
          />
          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};
