import {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  Ref,
} from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

import { Text, View, AntDesign, Entypo, FontAwesome } from "@/ui";

const styles = StyleSheet.create({
  successToastContainer: {
    backgroundColor: "#def1d7",
    borderColor: "#1f8722",
  },
  warningToastContainer: {
    backgroundColor: "#fef7ec",
    borderColor: "#f08135",
  },
  errorToastContainer: {
    backgroundColor: "#fae1db",
    borderColor: "#d9100a",
  },
  successToastText: {
    color: "#1f8722",
  },
  warningToastText: {
    color: "#f08135",
  },
  errorToastText: {
    color: "#d9100a",
  },
});

export interface ToastRef {
  show: ({
    type,
    text,
    duration,
  }: {
    type: string;
    text: string;
    duration: number;
  }) => void;
}

interface ToastProps {}

/**
 *
 * @param ToastProps
 * @param ToastRef
 * @returns
 *
 * @example
 * const toastRef = useRef<ToastRef>(null);
 *
 * toastRef.current?.show({
 *   type: "success",
 *   text: "Success Toast",
 *   duration: 2000,
 * });
 *
 * toastRef.current?.show({
 *   type: "error",
 *   text: "Error Toast",
 *   duration: 2000,
 * });
 *
 * toastRef.current?.show({
 *   type: "warning",
 *   text: "Warning Toast",
 *   duration: 2000,
 * });
 */

const ToastComponent = (_: ToastProps, ref: Ref<ToastRef>) => {
  const toastTopAnimation = useSharedValue(-100);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastText, setToastText] = useState("");
  const [toastDuration, setToastDuration] = useState(0);
  const TOP_VALUE = 60;

  const show = useCallback(
    ({
      type,
      text,
      duration,
    }: {
      type: string;
      text: string;
      duration: number;
    }) => {
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          duration,
          withTiming(-100, undefined, (finish) => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          }),
        ),
      );
    },
    [TOP_VALUE, toastTopAnimation],
  );

  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show],
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = toastTopAnimation.value;
    })
    .onUpdate((event) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(
          context.value + event.translationY,
          {
            damping: 600,
            stiffness: 100,
          },
        );
      }
    })
    .onEnd((event) => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, undefined, (finish) => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            withTiming(-100, undefined, (finish) => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            }),
          ),
        );
      }
    });

  return (
    <>
      {showing && (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              toastType === "success"
                ? styles.successToastContainer
                : toastType === "warning"
                  ? styles.warningToastContainer
                  : styles.errorToastContainer,
              animatedTopStyles,
            ]}
            className={`absolute top-0 w-[90%] p-[10px] rounded-[18px] border flex-row items-center self-center `}
          >
            <View>
              {toastType === "success" ? (
                <AntDesign name="checkcircle" size={24} color={"#1f8722"} />
              ) : toastType === "warning" ? (
                <FontAwesome name="warning" size={24} color={"#f08135"} />
              ) : (
                <Entypo name="circle-with-cross" size={24} color={"#d9100a"} />
              )}
            </View>
            <Text
              style={[
                toastType === "success"
                  ? styles.successToastText
                  : toastType === "warning"
                    ? styles.warningToastText
                    : styles.errorToastText,
              ]}
              className={`ml-[14px] text-[16px]`}
            >
              {toastText}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
};

export const Toast = forwardRef(ToastComponent);
