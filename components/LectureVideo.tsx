import { Video, ResizeMode } from "expo-av";
import { ActivityIndicator } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { muxStreamBaseUrl, videoExtension } from "@/constants";

export const LectureVideo = ({ playbackId }: { playbackId: string }) => {
  return (
    <ThemedView className="w-full h-[250px]">
      {playbackId ? (
        <ThemedView className="w-full h-[200px]">
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
        </ThemedView>
      ) : (
        <ThemedView className="w-full h-[250px] flex flex-row justify-center items-center">
          <ActivityIndicator size={"large"} />
        </ThemedView>
      )}
    </ThemedView>
  );
};
