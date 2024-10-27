import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import { client } from "@/api/common/client";
import { images } from "@/constants";
import { View, Text, Image } from "@/ui";

import { CustomButton } from "./CustomButton";

interface PaymentProps {
  courseid: string;
  price: number;
}

export const Payment = ({ courseid, price }: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState<boolean>(false);

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "ShikshaSetu, Inc.",
      intentConfiguration: {
        mode: {
          amount: Math.round(price * 100),
          currencyCode: "inr",
        },
        confirmHandler: async (
          paymentMethod,
          shouldSavePaymentMethod,
          intentCreationCallback,
        ) => {
          const response = await client.post(`courses/${courseid}/intent`, {
            courseId: courseid,
          });
          if (response.status === 200) {
            const { paymentIntent, customer } = response.data;
            if (paymentIntent.client_secret) {
              const res = await client.post(
                `courses/${courseid}/completeintent`,
                {
                  payment_method_id: paymentMethod.id,
                  payment_intent_id: paymentIntent.id,
                  customer_id: customer,
                  client_secret: paymentIntent.client_secret,
                },
              );
              if (res.status === 200) {
                const { result } = res.data;
                if (result.client_secret) {
                  intentCreationCallback({
                    clientSecret: result.client_secret,
                  });
                }
              }
            }
          }
        },
      },
      returnURL: "shikshasetu://home",
    });

    if (!error) {
      // setLoading(true);
    }
  };

  return (
    <View>
      <CustomButton
        title="Buy Now"
        className="absolute mx-2 bottom-[60px]"
        onPress={openPaymentSheet}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-bold mt-5">
            Payment Success
          </Text>

          <Text className="text-md text-blue-300 font-semibold text-center mt-3">
            Thank you.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(auth)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};
