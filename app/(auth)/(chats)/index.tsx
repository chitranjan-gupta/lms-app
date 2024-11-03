import { BackButton } from "@/components";
import { images } from "@/constants";
import { SafeAreaView, ScrollView, Text, View, Image } from "@/ui";

const Chat = () => {
  return (
    <View>
      <SafeAreaView className="flex-1 p-5 w-full h-full">
        <BackButton />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text className="text-3xl font-bold">Chat</Text>
          <View className="flex-1 h-fit flex justify-center items-center">
            <Image
              source={images.message}
              alt="message"
              style={{ width: "100%", height: 160 }}
              contentFit="contain"
            />
            <Text className="text-3xl font-bold mt-3">No Messages Yet</Text>
            <Text className="text-base mt-2 text-center px-7">
              Start a conversation with your friends and teachers
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Chat;
