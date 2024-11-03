import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";

import Dot from "./Dot";

const Pagination = ({
  data,
  x,
  size,
}: {
  data: { image: any }[];
  x: SharedValue<number>;
  size: number;
}) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        return <Dot key={i} x={x} index={i} size={size} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
