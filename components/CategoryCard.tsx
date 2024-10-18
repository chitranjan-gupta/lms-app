import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { bgcolors } from "@/constants/Colors";

export const CategoryCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <ThemedView
      key={item.id}
      className={`w-[130px] h-[50px] rounded-xl flex flex-row justify-center items-center mx-2`}
      style={{
        backgroundColor: bgcolors[index],
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 3,
      }}
    >
      <ThemedText className={`font-bold text-base`} style={{ color: "white" }}>
        {item.name}
      </ThemedText>
    </ThemedView>
  );
};
