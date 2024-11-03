import { Link, router } from "expo-router";
import { useEffect, useState } from "react";

import { CustomButton, InputField, OTPModal, SuccessModal } from "@/components";
import { images } from "@/constants";
import { useUser } from "@/core/store/user";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Checkbox,
  Feather,
  Fontisto,
  ImageBackground,
  Alert,
} from "@/ui";

import type { SignUpForm, Verification } from "@/types";

const SignUp = () => {
  const user = useUser((state) => state.user);
  const error = useUser((state) => state.error);
  const setUser = useUser((state) => state.setUser);
  const userStatus = useUser((state) => state.status);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isChecked, setChecked] = useState(false);
  const [isEye, setIsEye] = useState(true);
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState<Verification>({
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
      console.log(err);
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

  const onSuccess = () => {
    setShowSuccessModal(false);
    router.push("/(unauth)/sign-up");
  };
  return (
    <View className="w-full h-full">
      <ScrollView className="w-full h-full">
        <View className="flex-1">
          <View className="relative w-full h-[250px] rounded-bl-3xl">
            <ImageBackground
              source={images.background}
              className="z-0 w-full h-[250px] rounded-bl-3xl"
            >
              <View className="w-full h-[250px] rounded-bl-3xl"></View>
            </ImageBackground>
            <Text className="text-2xl font-bold absolute bottom-5 left-5">
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
              <Text className="!text-red-500">{error}</Text>
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
              disabled={userStatus === "pending" ? true : false}
              isLoading={userStatus === "pending" ? true : false}
              className="mt-6"
            />
            <Link
              href="/sign-in"
              className="text-lg text-center text-general-200 mt-10"
            >
              <Text>Already have an account? Log In</Text>
            </Link>
          </View>
          <OTPModal
            verification={verification}
            setVerification={setVerification}
            setShowSuccessModal={setShowSuccessModal}
            form={form}
            onPressVerify={onPressVerify}
          />
          <SuccessModal
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
            onPress={onSuccess}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
