import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5 w-full h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-3xl font-bold">Chat</Text>
        <View className="flex-1 h-fit flex justify-center items-center">
          <Image
            source={images.message}
            alt="message"
            className="w-full h-40"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold mt-3">No Messages Yet</Text>
          <Text className="text-base mt-2 text-center px-7">
            Start a conversation with your friends and teachers
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;