import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { images } from "@/constants";
import { useAuth } from "@/core/auth";

const SignIn = () => {
  const status = useAuth((state) => state.status);
  const error = useAuth((state) => state.error);
  const signIn = useAuth((state) => state.signIn);
  const isloading = useAuth((state) => state.isloading);
  const [isChecked, setChecked] = useState(false);
  const [isEye, setIsEye] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === "signIn") {
      router.replace("/(auth)/(tabs)/home");
    }
  }, [status]);

  const onSignInPress = async () => {
    try {
      if (form.email.length > 5 && form.password.length > 5) {
        signIn(form);
      } else {
        console.log("Email & Password length should be greater than 5");
        Alert.alert("Email & Password length should be greater than 5");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View className="w-full h-full">
      <StatusBar style="light" />
      <ScrollView className="flex-1 bg-white w-full h-full">
        <View className="flex-1 bg-white">
          <View className="relative w-full h-[250px] bg-white rounded-bl-3xl">
            <Image
              source={images.background}
              className="z-0 w-full h-[250px] rounded-bl-3xl"
            />
            <Text className="text-2xl text-white font-bold absolute bottom-5 left-5">
              Welcome 👋
            </Text>
          </View>

          <View className="p-5">
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
              title="Sign In"
              onPress={onSignInPress}
              disabled={isloading}
              isLoading={isloading}
              className="mt-6"
            />

            <Link
              href="/sign-up"
              className="text-lg text-center text-general-200 mt-10"
            >
              Don't have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
