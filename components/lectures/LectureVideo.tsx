import { Video, ResizeMode } from "expo-av";
import { useColorScheme } from "nativewind";

import { muxStreamBaseUrl, videoExtension } from "@/constants";
import { View } from "@/ui";

import { Loader } from "../Loader";

interface LectureVideoProps {
  playbackId: string;
}

export const LectureVideo = ({ playbackId }: LectureVideoProps) => {
  const { colorScheme } = useColorScheme();
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
          <Loader
            variant="small"
            color={colorScheme === "light" ? "black" : "white"}
          />
        </View>
      )}
    </View>
  );
};
