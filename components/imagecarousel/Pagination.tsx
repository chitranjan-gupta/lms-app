import { SharedValue } from "react-native-reanimated";

import { View } from "@/ui";

import Dot from "./Dot";

const Pagination = ({
  data,
  x,
  size,
}: {
  data: { image?: any; logo_url?: string }[];
  x: SharedValue<number>;
  size: number;
}) => {
  return (
    <View className="flex-row h-[40px] justify-center items-center">
      {data.map((_, i) => {
        return <Dot key={i} x={x} index={i} size={size} />;
      })}
    </View>
  );
};

export default Pagination;
