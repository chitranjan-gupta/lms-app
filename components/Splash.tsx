import LottieView from "lottie-react-native";

import { View } from "@/ui";

export const Splash = ({ onLoaded }: { onLoaded: () => Promise<void> }) => {
  return (
    <View className="w-full h-full bg-white flex flex-row justify-center items-center">
      <LottieView
        source={require("../assets/animations/splash.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          zIndex: 5,
          position: "absolute",
        }}
      />
      <LottieView
        source={require("../assets/animations/welcome.json")}
        autoPlay
        loop={false}
        resizeMode="contain"
        style={{ width: 300, height: 200, zIndex: 10 }}
        onAnimationFinish={onLoaded}
      />
    </View>
  );
};
