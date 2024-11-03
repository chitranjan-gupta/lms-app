import { Pressable, Text, View, ImageBackground } from "@/ui";

import type { Career } from "@/types";

interface CareerCardViewProps {
  item: Career;
}

export const CareerCardView = ({ item }: CareerCardViewProps) => {
  return (
    <View
      className="mx-2 rounded-xl bg-violet-300 w-[150px] h-[200px]"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
      }}
    >
      <Pressable className="rounded-xl">
        <View
          key={item.id}
          className={`w-full h-full rounded-xl flex flex-col justify-start items-center p-5`}
        >
          <View>
            <ImageBackground
              source={item?.company.logo_url!}
              className="rounded-xl w-[48px] h-[48px]"
              style={{ borderRadius: 12 }}
              imageStyle={{ borderRadius: 12 }}
            ></ImageBackground>
          </View>
          <View className="h-[50px] flex flex-col justify-start items-center w-full gap-y-2">
            <View className="flex flex-col items-center">
              <Text
                className={`text-black font-black text-xl`}
                style={{ color: "black" }}
              >
                {item?.title!}
              </Text>
            </View>
            <View className="flex flex-col items-center">
              <Text
                className={`text-black font-bold text-base`}
                style={{ color: "black" }}
              >
                {item?.company?.industry!}
              </Text>
              <Text
                className={`text-black font-bold text-base`}
                style={{ color: "black" }}
              >
                {`${item.location!}`}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
