import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";

import { TabBarIcon } from "@/components";
import { Colors } from "@/constants/Colors";

export default function Layout() {
  const { colorScheme } = useColorScheme();

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
          height: 70,
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
              focused={focused}
              color={color}
              icontype={"entypo"}
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
              name="book"
              focused={focused}
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
              name="suitcase"
              focused={focused}
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
              name="user-circle"
              focused={focused}
              color={color}
              icontype={"fontawesome"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
