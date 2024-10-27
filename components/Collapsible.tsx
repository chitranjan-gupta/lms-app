import { useColorScheme } from "nativewind";
import { type PropsWithChildren, useState } from "react";
import { StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import { TouchableOpacity, Text, View, Ionicons } from "@/ui";

interface CollapsibleProps extends PropsWithChildren {
  title: string;
}

export function Collapsible({ children, title }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? "light";

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
        <Text className="font-semibold">{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
