import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useUser } from "@/core/store/user";

const SignUp = () => {
  const user = useUser((state) => state.user);
  const error = useUser((state) => state.error);
  const setUser = useUser((state) => state.setUser);
  const status = useUser((state) => state.status);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isEye, setIsEye] = useState(true);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  useEffect(() => {
    if (user && (user as any).userId) {
      setShowSuccessModal(true);
    }
  }, [user]);

  const onSignUpPress = async () => {
    try {
      // setVerification({
      //   ...verification,
      //   state: "pending",
      // });
      setUser(form);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.message);
    }
  };

  const onPressVerify = async () => {
    try {
      if (true) {
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.message,
        state: "failed",
      });
    }
  };
  return (
    <View className="w-full h-full">
      <StatusBar style="light" />
      <ScrollView className=" bg-white w-full h-full">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px] rounded-bl-3xl bg-white">
            <Image
              source={images.background}
              className="z-0 w-full h-[250px] rounded-bl-3xl"
            />
            <Text className="text-2xl font-bold text-white absolute bottom-5 left-5">
              Create Your Account
            </Text>
          </View>
          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter name"
              IconLeft={
                <Feather
                  name="user"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              }
              value={form.name}
              onChangeText={(value: any) => setForm({ ...form, name: value })}
            />
            <InputField
              label="Username"
              placeholder="Enter username"
              IconLeft={
                <Feather
                  name="user"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              }
              value={form.username}
              onChangeText={(value: any) =>
                setForm({ ...form, username: value })
              }
            />
            <InputField
              label="Email"
              placeholder="Enter email"
              IconLeft={
                <Fontisto
                  name="email"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              }
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value: any) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              IconLeft={
                <Feather
                  name="lock"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              }
              IconRight={
                <Pressable onPress={() => setIsEye((prev) => !prev)}>
                  {isEye ? (
                    <Feather
                      name="eye"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                  ) : (
                    <Feather
                      name="eye-off"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                  )}
                </Pressable>
              }
              secureTextEntry={isEye}
              textContentType="password"
              value={form.password}
              onChangeText={(value: any) =>
                setForm({ ...form, password: value })
              }
            />
            <View>
              <Text className="text-red-500">{error}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-x-2 p-3">
              <Checkbox value={isChecked} onValueChange={setChecked} />
              <Text>
                By creating an account you have to agree with our terms &
                condition
              </Text>
            </View>
            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              disabled={status === "pending" ? true : false}
              isLoading={status === "pending" ? true : false}
              className="mt-6"
            />
            <Link
              href="/sign-in"
              className="text-lg text-center text-general-200 mt-10"
            >
              Already have an account?{" "}
              <Text className="text-primary-500">Log In</Text>
            </Link>
          </View>
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
                IconLeft={icons.lock}
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
          <ReactNativeModal
            isVisible={showSuccessModal}
            style={{ marginLeft: "12%" }}
          >
            <View className="bg-white px-4 rounded-2xl h-[320px] w-[300px] flex flex-col justify-center items-center gap-y-5">
              <View className="flex flex-row justify-center items-center">
                <AntDesign name="checkcircle" size={60} color="#0096FF" />
              </View>
              <Text className="text-3xl text-center">Success</Text>
              <Text className="text-base text-gray-400 text-center mt-2">
                Congratulations, you have successfully completed your
                registration.
              </Text>
              <CustomButton
                title="Log In"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push("/(unauth)/sign-in");
                }}
                className="mt-5 rounded-lg"
              />
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
