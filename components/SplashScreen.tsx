import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { Splash } from "@/components/Splash";

export function AnimatedAppLoader({ children }: { children: ReactNode }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      setSplashReady(true);
    }

    prepare();
  }, []);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children }: { children: ReactNode }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [animation, isAppReady]);

  const onLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
      console.error(e);
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: animation,
            },
          ]}
        >
          <Splash onLoaded={onLoaded} />
        </Animated.View>
      )}
    </View>
  );
}
