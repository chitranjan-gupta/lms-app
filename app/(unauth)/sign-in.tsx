import { Link } from "expo-router";
import { useRef, useState } from "react";
import FlashMessage from "react-native-flash-message";

import { CustomButton, InputField } from "@/components";
import { images } from "@/constants";
import { useAuth } from "@/core/auth";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Checkbox,
  Feather,
  Fontisto,
  Image,
} from "@/ui";

const SignIn = () => {
  const flashRef = useRef<FlashMessage>(null);
  const { error, signIn, isloading } = useAuth();
  const [isChecked, setChecked] = useState(false);
  const [isEye, setIsEye] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    try {
      if (form.email.length > 5 && form.password.length > 5) {
        await signIn(form);
      } else {
        flashRef.current?.showMessage({
          message: "Email & Password length should be greater than 5",
          type: "danger",
        });
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="w-full h-full">
      <FlashMessage ref={flashRef} position="top" statusBarHeight={20} />
      <ScrollView className="flex-1 w-full h-full">
        <View className="flex-1 ">
          <View className="relative w-full h-[250px] rounded-bl-3xl">
            <Image
              source={images.background}
              contentFit="cover"
              style={{
                width: "100%",
                height: "100%",
                zIndex: 0,
                borderBottomLeftRadius: 30,
              }}
            />
            <Text className="text-2xl font-bold absolute bottom-5 left-5">
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
              <Text className="">Don't have an account? Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
