import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { images } from "@/constants";

const Chat = () => {
  return (
    <ThemedView lightColor="white" darkColor="black">
      <SafeAreaView className="flex-1 p-5 w-full h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ThemedText className="text-3xl font-bold">Chat</ThemedText>
          <ThemedView className="flex-1 h-fit flex justify-center items-center">
            <Image
              source={images.message}
              alt="message"
              className="w-full h-40"
              resizeMode="contain"
            />
            <ThemedText className="text-3xl font-bold mt-3">
              No Messages Yet
            </ThemedText>
            <ThemedText className="text-base mt-2 text-center px-7">
              Start a conversation with your friends and teachers
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Chat;
