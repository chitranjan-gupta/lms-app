import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import { ThemedView } from "@/components/ThemedView";

export enum IconType {
  fontawesome = "fontawesome",
  ionicons = "ionicons",
  feather = "feather",
  image = "image",
}

interface TabBarProps {
  focused: boolean;
  name: string;
  color: string;
  icontype: "fontawesome" | "ionicons" | "feather" | "materialicons" | "image";
  source?: ImageSourcePropType;
}

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
    } else if (icontype === "image" && source) {
      return (
        <Image
          source={source}
          tintColor={color}
          resizeMode="contain"
          className="w-7 h-7"
        />
      );
    }
    return null; // If no icon matches
  };

  return (
    <ThemedView
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-blue-300" : ""}`}
    >
      <ThemedView
        className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-blue-400" : ""}`}
        darkColor="#000"
        lightColor="#000"
      >
        {renderIcon()}
      </ThemedView>
    </ThemedView>
  );
}
