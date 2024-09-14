import { Video, ResizeMode } from "expo-av";
import { ActivityIndicator, View } from "react-native";

import { muxStreamBaseUrl, videoExtension } from "@/constants";

export const LectureVideo = ({ playbackId }: { playbackId: string }) => {
  return (
    <View className="w-full h-[250px]">
      {playbackId ? (
        <View className="w-full h-[200px]">
          <Video
            source={{
              uri: `${muxStreamBaseUrl}/${playbackId}.${videoExtension}`,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      ) : (
        <View className="w-full h-[250px] flex flex-row justify-center items-center">
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};
