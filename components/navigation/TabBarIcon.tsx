import {
  View,
  Ionicons,
  FontAwesome,
  Feather,
  MaterialIcons,
  Entypo,
  Image,
} from "@/ui";

import type { TabBarProps } from "@/types";

export function TabBarIcon({
  focused,
  name,
  color,
  icontype,
  source,
}: TabBarProps) {
  const renderIcon = () => {
    if (icontype === "ionicons" && name in Ionicons.glyphMap) {
      return (
        <Ionicons
          name={name as keyof typeof Ionicons.glyphMap}
          color={color}
          size={24}
        />
      );
    } else if (icontype === "fontawesome" && name in FontAwesome.glyphMap) {
      return (
        <FontAwesome
          name={name as keyof typeof FontAwesome.glyphMap}
          color={color}
          size={24}
        />
      );
    } else if (icontype === "feather" && name in Feather.glyphMap) {
      return (
        <Feather
          name={name as keyof typeof Feather.glyphMap}
          color={color}
          size={24}
        />
      );
    } else if (icontype === "materialicons" && name in MaterialIcons.glyphMap) {
      return (
        <MaterialIcons
          name={name as keyof typeof MaterialIcons.glyphMap}
          color={color}
          size={24}
        />
      );
    } else if (icontype === "entypo" && name in Entypo.glyphMap) {
      return (
        <Entypo
          name={name as keyof typeof Entypo.glyphMap}
          color={color}
          size={24}
        />
      );
    } else if (icontype === "image" && source) {
      return (
        <Image
          source={source}
          tintColor={color}
          contentFit="contain"
          className="w-7 h-7"
        />
      );
    }
    return null; // If no icon matches
  };

  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-blue-300" : ""}`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-blue-400" : ""}`}
      >
        {renderIcon()}
      </View>
    </View>
  );
}
