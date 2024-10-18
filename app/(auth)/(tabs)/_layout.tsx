import { Tabs } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { icons } from "@/constants";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/core/hooks/useColorScheme";

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name="home"
              source={icons.home}
              focused={focused}
              color={color}
              icontype={"image"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              name="book"
              color={color}
              icontype={"feather"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              name="suitcase"
              color={color}
              icontype={"fontawesome"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="kanban"
        options={{
          title: "Kanban",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name="view-kanban"
              focused={focused}
              color={color}
              icontype={"materialicons"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name="profile"
              source={icons.profile}
              focused={focused}
              color={color}
              icontype={"image"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
