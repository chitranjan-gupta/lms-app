import { SharedValue } from "react-native-reanimated";

import { View } from "@/ui";

import { Dot } from "./Dot";

import type { Onboarding } from "@/types";

type PaginationProps = {
  data: Onboarding[];
  x: SharedValue<number>;
};

export const Pagination = ({ data, x }: PaginationProps) => {
  return (
    <View className="flex flex-row h-[40px] justify-center items-center">
      {data.map((_, index) => {
        return <Dot index={index} x={x} key={index} />;
      })}
    </View>
  );
};
