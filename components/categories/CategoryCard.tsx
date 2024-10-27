import { bgcolors } from "@/constants/Colors";
import { View, Text } from "@/ui";

interface CategoryCardProps {
  item: any;
  index: number;
}

export const CategoryCard = ({ item, index }: CategoryCardProps) => {
  return (
    <View
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
      <Text className={`font-bold text-base text-white`}>{item.name}</Text>
    </View>
  );
};
